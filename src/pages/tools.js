import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

import Layout from "../components/layout"
import toolsStyles from "./tools.module.scss"
import Head from "../components/head"

const ToolsPage = () => {
  const data = useStaticQuery(graphql`
  query {
    allMarkdownRemark {
      edges {
        node {
          fields {
            githubData {
              repository {
                stargazers {
                  totalCount
                }
                name
              }
            }
          }
          frontmatter {
            title
            slug
            date
          }
        }
      }
    }
  }
  `)

  return (
    <Layout>
      <Head title="Tools" />
      <h1>Tools</h1>
      <ol className={toolsStyles.posts}>
        {data.allMarkdownRemark.edges.map(edge => {
          return (
            <li className={toolsStyles.post}>
              <Link to={`/tools/${edge.node.frontmatter.slug}`}>
                <h2>{edge.node.frontmatter.title}</h2>
                <p>{edge.node.frontmatter.date}</p>
                <p>{edge.node.fields.githubData.repository.stargazers.totalCount}</p>
              </Link>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default ToolsPage
