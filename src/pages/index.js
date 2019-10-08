import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Head from "../components/head"

const IndexPage = () => {
  return (
    <Layout>
      <Head title="Home" />

      <p>
        You would like to learn about exciting developments in geospatial data,
        tools and technologies but do not know where to start searching for
        them. Luckily for you there are a wide range of online resources. We are
        here to help you find these resources and use them. Please note that
        this site is under development.
      </p>
    </Layout>
  )
}

export default IndexPage
