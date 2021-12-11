const github = require("@actions/github")

const core = require("@actions/core")

const {Octokit } = require("octokit")
async function runMain(){
    try {
        console.log(github.context)
        const octokit = new github.getOctokit({auth: core.getInput('token')})
        console.log({
            issue_number: github.context.payload.issue.id,
            owner: github.context.payload.repository.owner,
            repo: github.context.payload.repository.name,
            body: core.getInput('message')
        })
        let res = await octokit.rest.issues.createComment({
            issue_number: github.context.payload.issue.id,
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