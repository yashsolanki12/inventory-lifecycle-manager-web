import { redirect, Form, useLoaderData, useNavigate } from "react-router";
import { login } from "../../shopify.server";
import styles from "./styles.module.css";
import React from "react";

export const loader = async ({ request }) => {
  const url = new URL(request.url);

  if (url.searchParams.get("shop") || url.searchParams.get("appLoadId")) {
    const params = new URLSearchParams(url.searchParams);
    params.delete("appLoadId"); // Optional: clean it up during redirect
    throw redirect(`/app?${params.toString()}`);
  }

  return { showForm: Boolean(login) };
};

export default function App() {
  const { showForm } = useLoaderData();
  const navigate = useNavigate();

  React.useEffect(() => {
    // If App Bridge pushes us here client-side (sidebar click), immediately go to Dashboard
    navigate("/app", { replace: true });
  }, [navigate]);

  return (
    <div className={styles.index}>
      <div className={styles.content}>
        <h1 className={styles.heading}>A short heading about [your app]</h1>
        <p className={styles.text}>
          A tagline about [your app] that describes your value proposition.
        </p>
        {showForm && (
          <Form className={styles.form} method="post" action="/auth/login">
            <label className={styles.label}>
              <span>Shop domain</span>
              <input className={styles.input} type="text" name="shop" />
              <span>e.g: my-shop-domain.myshopify.com</span>
            </label>
            <button className={styles.button} type="submit">
              Log in
            </button>
          </Form>
        )}
        <ul className={styles.list}>
          <li>
            <strong>Product feature</strong>. Some detail about your feature and
            its benefit to your customer.
          </li>
          <li>
            <strong>Product feature</strong>. Some detail about your feature and
            its benefit to your customer.
          </li>
          <li>
            <strong>Product feature</strong>. Some detail about your feature and
            its benefit to your customer.
          </li>
        </ul>
      </div>
    </div>
  );
}
