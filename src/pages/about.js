import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Head from "../components/head"

const AboutPage = () => {
  return (
    <Layout>
      <Head title="About" />
      <h1>Why have we created this resource?</h1>
      <p>There are an increasing number of available geospatial tools and technologies. Many of these tools and technologies are free and open source.
      We wanted to collate available tools and technologies.</p>
     
    </Layout>
  )
}

export default AboutPage
