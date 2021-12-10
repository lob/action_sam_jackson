const github = require("@actions/github")

const core = require("@actions/core")

const {Octokit, App} = require("octokit")

try {
    const octokit = new Octokit(github.token)
    await octokit.request(github.context.payload.issue.comments_url, {
        body: inputs.message
    })

} catch( err ) {
    console.log("There was an error executing the action: " + err)
    core.setFailed(err.message)
}
