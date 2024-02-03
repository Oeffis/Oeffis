#!/usr/bin/env node

const execSync = require('child_process').execSync;
const writeFileSync = require('fs').writeFileSync;

const TIME_SPENT_REGEX = /Time spent: (?:(?:(?<hours>\d+) hours? (?<minutes>30|0) minutes?)|(?:(?<justHours>\d+) hours?)|(?:(?<justMinutes>30|0) minutes?))/i;

async function geatherData() {
  const data = execSync('gh issue list --json title,comments,number --limit 999999999999 --state all', { encoding: 'utf-8' });
  const parsed = JSON.parse(data);
  console.log(`Parsed ${parsed.length} issues`);
  return parsed;
}

async function simplifyData(data) {
  const simplifiedData = data.map((issue) => {
    const { number, comments, title } = issue;

    const commentsWithTimeSpent = comments
      .filter((comment) => {
        const { body } = comment;
        const containsTimeSpent = body.match(TIME_SPENT_REGEX);
        return containsTimeSpent;
      })
      .map((comment) => {
        const { body, author } = comment;

        return {
          body,
          login: author.login,
        };
      });

    return {
      title,
      number,
      comments: commentsWithTimeSpent,
    };
  });

  const simplifiedDataWithoutEmptyComments = simplifiedData.filter((issue) => issue.comments.length > 0);
  return simplifiedDataWithoutEmptyComments;
}

async function parseTimeSpents(data) {
  const parsedData = data.map((issue) => {
    const { number, comments, title } = issue;

    const parsedComments = comments.map((comment) => {
      const { body, login } = comment;

      const match = body.match(TIME_SPENT_REGEX);

      if (!match.groups) {
        console.log(match.groups);
      }

      const minutes = parseInt(match.groups.minutes || match.groups.justMinutes || 0);
      const hours = parseInt(match.groups.hours || match.groups.justHours || 0);

      const timeSpentInMinutes = minutes + (hours * 60);

      return {
        login,
        timeSpentInMinutes,
      };
    });

    return {
      title,
      number,
      comments: parsedComments,
    };
  });

  return parsedData;
}

async function aggregatePerIssueAndLogin(data) {
  const aggregatedData = data.reduce((acc, issue) => {
    const { title, number, comments } = issue;

    comments.forEach((comment) => {
      const { login, timeSpentInMinutes } = comment;

      if (!acc[login]) {
        acc[login] = {};
      }

      if (!acc[login][number]) {
        acc[login][number] = { amount: 0, title };
      }

      acc[login][number].amount += timeSpentInMinutes;
    });

    return acc;

  }, {});

  return aggregatedData;
}

async function aggregatePerLogin(data) {
  const aggregatedData = data.reduce((acc, issue) => {
    const { number, comments } = issue;

    comments.forEach((comment) => {
      const { login, timeSpentInMinutes } = comment;

      if (!acc[login]) {
        acc[login] = 0;
      }

      acc[login] += timeSpentInMinutes;
    });

    return acc;

  }, {});

  return aggregatedData;
}

async function aggregatePerIssue(data) {
  const aggregatedData = data.reduce((acc, issue) => {
    const { number, comments } = issue;

    if (!acc[number]) {
      acc[number] = 0;
    }

    comments.forEach((comment) => {
      const { timeSpentInMinutes } = comment;
      acc[number] += timeSpentInMinutes;
    });

    return acc;

  }, {});

  return aggregatedData;
}

async function main() {
  const data = await geatherData();
  const simplifiedData = await simplifyData(data);
  const parseTimeSpentsData = await parseTimeSpents(simplifiedData);

  // const perIssueAndLogin = await aggregatePerIssueAndLogin(parseTimeSpentsData);
  const perLogin = await aggregatePerLogin(parseTimeSpentsData);
  const perIssue = await aggregatePerIssue(parseTimeSpentsData);
  const perIssueAndLogin = await aggregatePerIssueAndLogin(parseTimeSpentsData);

  const csvPerLogin = 'login,timeSpentInMinutes\n' + Object.entries(perLogin).map(([login, timeSpentInMinutes]) => `${login},${timeSpentInMinutes}`).join('\n');
  const csvPerIssue = 'issue,timeSpentInMinutes\n' + Object.entries(perIssue).map(([issue, timeSpentInMinutes]) => `${issue},${timeSpentInMinutes}`).join('\n');
  const csvPerIssueAndLogin = 'login,issue,timeSpentInMinutes\n' +
    Object.entries(perIssueAndLogin).map(([login, issues]) =>
      Object.entries(issues)
        .sort(([_issueA, entryA], [_issueB, entryB]) => (entryB.amount - entryA.amount))
        .map(([issue, entry]) =>
          `${login},${issue},"${entry.title}",${entry.amount}`
        ).join('\n')
    ).join('\n');

  writeFileSync('perLogin.csv', csvPerLogin);
  writeFileSync('perIssue.csv', csvPerIssue);
  writeFileSync('perIssueAndLogin.csv', csvPerIssueAndLogin);
}

main()
  .then(() => console.log('Done'))
  .catch((error) => console.error(error));
