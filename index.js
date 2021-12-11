const github = require("@actions/github")

const core = require("@actions/core")

const { Octokit } = require("@octokit/action");
async function runMain(){
    try {
        console.log(github.context.payload)
        const octokit = new Octokit({auth: core.getInput('token')})
        console.log({
            issue_number: github.context.payload.issue.number,
            owner: github.context.payload.repository.owner.login,
            repo: github.context.payload.repository.name,
            body: core.getInput('message')
        })
        const { data } = await octokit.request("POST /repos/{owner}/{repo}/issues", {
            owner,
            repo,
            title: "My test issue",
          });
        console.log(data)
        let res = await octokit.rest.issues.createComment({
            issue_number: github.context.payload.issue.number,
            owner: github.context.payload.repository.owner.login,
            repo: github.context.payload.repository.name,
            body: core.getInput('message')
        })
        console.log(res)
        // console.log(data)

    } catch( err ) {
        console.log("There was an error executing the action: " + err)
        core.setFailed(err.message)
    }
}

runMain()