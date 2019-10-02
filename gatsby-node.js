const path = require("path")
const { GraphQLClient } = require("graphql-request")
const parseGHUrl = require("parse-github-url")
const { graphql } = require("@octokit/graphql")
// MD posts
// module.exports.onCreateNode = ({ node, actions }) => {
//   const { createNodeField } = actions

//   if (node.internal.type === "MarkdownRemark") {
//     const slug = path.basename(node.fileAbsolutePath, ".md")

//     createNodeField({
//       node,
//       name: "slug",
//       value: slug,
//     })
//   }
// }

// Trying to see node types
// Using https://github.com/gatsbyjs/gatsby/issues/17624

exports.onCreateNode = async ({
  node,
  actions: { createNode },
  createContentDigest,
  cache,
}) => {
  console.log(node.internal.type)
  if (node.internal.type === "GraphQLSource") {
    console.log(node)
  }
}


// Standard initial cod- did not work
// const { repository } = await graphql(
//   `
//   {
//     repository(owner:"octokit", name: "graphql.js){
//       issues(last: 3) {
//         edges {
//           node {
//             title
//           }
//         }
//       }
//     }
//   }
//   `,
//   {
//     headers: {
//       authorization: "f4c7f1c364788306e41a0112fe245edaa0529193 ",
//     },
//   }
// )
// console.log("Trying octokit: " + repository)

// Contentful Github repos
// Gather data
const githubApiClient = process.env.GITHUB_TOKEN
  ? new GraphQLClient("https://api.github.com/graphql", {
      headers: {
        authorization: "Bearer $ {process.env.GITHUB_TOKEN}",
      },
    })
  : console.log("GITHUB TOKEN NOT FOUND!")

exports.onCreateNode = async ({ node, actions, getNode, reporter }) => {
  const { createNode, createNodeField } = actions

  //console.log(JSON.stringify(node, undefined, 4))

  // Fetch additional data from Github for repos fetch from CMS

  /**
   * Fetch additional data from Github and NPM for tools L20-55
   * https://github.com/kamiljozwik/frontstate/blob/master/gatsby-node.js
   */
  switch (node.internal.type) {
    // This is the type of  node (similar to node.internal.type==="GraphQLSource")
    case "ContentfulTool": {
      /**
       * Add field with Github Data to tool's Node
       */
      async function getGithubData(owner, name) {
        try {
          const response = await githubApiClient.request(`
            query {
              repository(owner:"${owner}", name:"${name}") {
                name
                stargazers {
                  totalCount
                }
                createdAt
              }
            }
          `)
          console.log("owner is" + owner)
          return response
        } catch (error) {
          console.log("Cannot get data for Github repo: ", name)
          return null
        }
      }
      // Try changing node.github to node.slug, as this is the GH url in Tool content model
      const repoMeta = node.slug ? parseGHUrl(node.slug) : null
      const repoData = await (repoMeta
        ? getGithubData(repoMeta.owner, repoMeta.name)
        : null)
      console.log("repoMeta is" + repoMeta)
      console.log(JSON.stringify(repoMeta))
      console.log("repoMeta.owner is " + repoMeta.owner)
      console.log("repoMeta.name is" + repoMeta.name)
      console.log("repoData is" + repoData)

      //Add field with data to repo's Node

      createNodeField({
        node,
        name: "githubData",
        value: repoData,
      })

      // Test to see if working THIS HAS WORKED
      createNodeField({
        node,
        name: "test1",
        value: "testText",
      })
    }
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  // Create pages here using data fetched during 'onCreateNode'
}

// Contentful blog
module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const blogTemplate = path.resolve("./src/templates/blog.js")
  const res = await graphql(`
    query {
      allContentfulBlogPost {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)

  res.data.allContentfulBlogPost.edges.forEach(edge => {
    createPage({
      component: blogTemplate,
      path: `/blog/${edge.node.slug}`,
      context: {
        slug: edge.node.slug,
      },
    })
  })
}
