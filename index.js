const github = require("@actions/github")

const core = require("@actions/core")

const { Octokit } = require("@octokit/action");

let gifURLs = [
    'https://tenor.com/bkPhs.gif', //silly face sam
    'https://tenor.com/Eoaa.gif', //snakes on a plane
    'https://tenor.com/be2t1.gif', //oh-really-sam?!
    'https://tenor.com/x2eH.gif', //jurassic park
    'https://tenor.com/urMY.gif' //pink wig sam
 
]

async function runMain(){
    try {
        let message = `!(jkjkj)[./samuel-l-jackson-silly.gif] \n`
        const octokit = new Octokit({auth: core.getInput('token')})
        let res = await octokit.rest.issues.createComment({
            issue_number: github.context.payload.issue.number,
            owner: github.context.payload.repository.owner.login,
            repo: github.context.payload.repository.name,
            body: message + core.getInput('message')
        })
        console.log(res)

    } catch( err ) {
        console.log("There was an error executing the action: " + err)
        core.setFailed(err.message)
    }
}

runMain()