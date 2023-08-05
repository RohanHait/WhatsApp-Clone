
# WhatsApp-Clone
It is an application to send sms online from anywhere to anyone


## Tech Stack

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) 
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![ReactJs](https://img.shields.io/badge/-ReactJs-23272f?logo=react&logoColor=Blue&style=for-the-badge)



## Screenshots
<img src= "./screenshots/Screen%20Shot%202023-08-05%20at%2002.20.07.png" alt = "" height = "800px"/>
<img src= "./screenshots/Screen%20Shot%202023-08-05%20at%2002.20.07.png" alt = "" height = "800px"/>
<img src= "./screenshots/Screen%20Shot%202023-08-05%20at%2002.26.17.png" alt = "" height = "800px"/>
<img src= "./screenshots/Screen%20Shot%202023-08-05%20at%2002.26.56.png" alt = "" height = "800px"/>
<img src= "./screenshots//Screen%20Shot%202023-08-05%20at%2002.34.14.png" alt = "" height = "800px"/>
<img src= "./screenshots/Screen%20Shot%202023-08-05%20at%2002.34.41.png" alt = "" height = "800px"/>
<img src= "./screenshots/Screen%20Shot%202023-08-05%20at%2002.39.40.png" alt = "" height = "800px"/>
<img src= "./screenshots/Screen%20Shot%202023-08-05%20at%2002.39.48.png" alt = "" height = "800px"/>


## Installation
**1.** Fork [this](https://github.com/RohanHait/WhatsApp-Colne) repository.

**2.** Clone WhatsApp-Clone and install all dependencies

```bash
  git clone "https://github.com/<your-username>/WhatsApp-Colne" 

  cd ./WhatsApp-Colne/server | npm install
  cd ../whatsapp-clone-ui | npm install
```
**3.** Add a reference(remote) to the original repository.
```bash
git remote and upstream https://github.com/RohanHait/WhatsApp-Colne
```
**4.** Configure .env file in server folder
``` env
# env file on ./server 
MONGO_URI = 'Your URL'
PORT = yourPort 
JWT_SECRET = "Secret_key"
```
**5.** Check the remotes for this repository.

```
git remote -v
```

**6.** Always take a pull from the upstream repository to your main branch to keep it at par with the main project(updated repository). Feel free to raise new issues.

```
git pull upstream main
```

**7.** Create a new branch.

```
git checkout -b <your_branch_name>
```

**8.** Make necessary changes and commit those changes

**9.** Track your changes.

```
git add .
```

**10.** Commit your changes .

```
git commit -m "bla bla bla"
```

**11.** Push the committed changes in your feature branch to your remote repo.

```
git push -u origin <your_branch_name>
```

**12.** To create a pull request, click on `Compare & pull request`. Please ensure you compare your feature branch to the desired branch of the repo you are suppose to make a PR to.

**13.** Add appropriate title and description to your pull request explaining your changes and efforts done.

**14.** Click on `Create pull request`.

**15.** And you are done creating a pull request to this project. Be patient while your PR is reviewed.

