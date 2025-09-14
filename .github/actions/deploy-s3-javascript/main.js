const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');

function run() {
    // 1) Get inputs
    const bucketName = core.getInput('s3-bucket', { required: true });
    const region = core.getInput('aws-region', { required: true });
    const sourceDir = core.getInput('source-dir', { required: true });  

    // 2) Upload files to S3
    const uploadCommand = `aws s3 sync ${sourceDir} s3://${bucketName} --region ${region}`;
    exec.exec(uploadCommand);

    // 3) Log success message
    core.notice('Deploying to S3 using JavaScript action');
}
run();