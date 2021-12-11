const github = require("@actions/github")

const core = require("@actions/core")

const {Octokit } = require("octokit")
async function runMain(){
    try {
        console.log(ithub.context.payload.repository)
        const octokit = new Octokit(github.token)
        await octokit.request('POST /repos/{owner}/{repo}/issues/{issue_number}/comments', {
            issue_number: github.context.payload.issue.id,
            owner: github.context.payload.repository.owner.login,
            repo: github.context.payload.repository.name,
            body: core.getInput('message')
        })

    } catch( err ) {
        console.log("There was an error executing the action: " + err)
        core.setFailed(err.message)
    }
}

runMain()