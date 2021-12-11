const github = require("@actions/github")

const core = require("@actions/core")

const { Octokit } = require("@octokit/action");

let gifURLs = [
    'https://c.tenor.com/p29xMArwXB8AAAAd/samuel-l-jackson-silly.gif', //silly face sam
    'https://c.tenor.com/8aKkFuCN7TsAAAAC/samuel-l-jackson-snakes-on-a-plane.gif', //snakes on a plane
    'https://c.tenor.com/PUw8yTi8V5AAAAAC/samuel-l-jackson-shocked.gif', //oh-really-sam?!
    'https://c.tenor.com/hIhNfnidIlkAAAAC/butts-release.gif', //jurassic park
    'https://c.tenor.com/m36sCPqucWMAAAAC/samuel-jackson-pink.gif' //pink wig sam
 
]

async function runMain(){
    try {
        let message = `<img src="${gifURLs[ Math.floor(Math.random() * gifURLs.length - 1)]}" width="200px" /> \n`
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