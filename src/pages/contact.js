import React from "react"

import Layout from "../components/layout"
import Head from "../components/head"

const ContactPage = () => {
  return (
    <Layout>
      <Head title="Contact" />
      <h1>Contact</h1>
      <p>
        The best way to reach me is via{" "}
        <a href="https://twitter.com/@kitmacleod" target="_blank">
          @kitmacleod
        </a>{" "}
        on Twitter!
      </p>
    </Layout>
  )
}

export default ContactPage
