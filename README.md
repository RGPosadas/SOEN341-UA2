# Group Project for SOEN341-UA2: Twitter
This project's goal is to create a web application similar to Twitter.

## Technologies Used
* Front-end: node.js
* Back-end: undecided

## Team Members
* Ritchelle Grace Posadas, 40057013
* Umer Anwar, 40032710
* Cindy Lo, 40065338
* Tung Leu,40025151
* Andres Vidoza, 40054362
* Divesh Patel, 40027989
* Muhammad Saad Mujtaba, 40043156
* Kajanthy Subramaniam, 40063712
* Nhut Vo, 40021967

***

## Git Rules

### Branches
* `master`: Production-ready branch. Can only be merged to using the PR model. Only `develop` can be merged to `master`.
* `develop`: Development branch. Can only be merged to using the PR model. Only tasks, user stories, and bug branches can be merged to `develop`.
* `TASK-#`: Task branches. Not all tasks need code to be edited, but if you do, please name it according to the Task number.
* `USER-STORY-#`: Feature branches. Used to develop new features for the project. Please name it according to the User Story number.
* `BUG-#`: Used for bug fixing. Please name it according to the Bug number.

<br/>

### Creating a New Branch
We will be basing all our branches from the `develop` branch. Why not master? Because this way, you can pull all the other features that were not yet merged to `master`, but exist in `develop`.
1. Go to your `develop` branch:
```
git checkout develop
```
2. Pull all changes that were made:
```
git pull
```
3. Create a new branch based off of `develop`:
```
git branch BRANCH-TYPE-#/Name-of-Branch-Type
Ex: TASK-1/Ritchelle-PR
```
4. Go to your new branch and start working from there:
```
git checkout BRANCH-TYPE-#
Ex: git checkout TASK-1/Ritchelle-PR
```

<br/>

### Commit Messages
* It is important to note the branch type and number in the commit message (merged branches won't appear in `develop` and `master`'s commit history, so this will help us with our git history in the long run).
In today's standard, each commit message starts off with an action verb in present tense.
* Also include the GitHub Issue number in your commit.
```
Example commit message:
TASK-1: Update README.md, Issue #4
```

<br/>

### How Do I Merge to Develop?
1. Go to our main repo page and click on: `New pull request.
2. Select your source branch to your destination branch (unless you're doing a PR from `develop` to `master`, you're always going to merge to `develop` as your destination branch).
3. Fix any merge conflicts.
4. At least 2 teammates have to approve the PR before it gets merged.
5. Once merged, close your GitHub issue.
