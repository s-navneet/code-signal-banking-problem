let queries = [
  ["CREATE_ACCOUNT", "1", "account1"],
  ["CREATE_ACCOUNT", "2", "account2"],
  ["CREATE_ACCOUNT", "3", "account3"],
  ["DEPOSITE", "4", "account1", "2000"],
  ["DEPOSITE", "5", "account2", "3000"],
  ["DEPOSITE", "6", "account3", "4000"],
  //   ["TOP_ACTIVITY", "7", "3"],
  ["PAY", "8", "account1", "1500"],
  ["PAY", "9", "account2", "250"],
  //   ["DEPOSITE", "10", "account3", "250"],
  ["TOP_ACTIVITY", "11", "3"],
];

let createAccounts = [];
let bankDetails = [];

function creatAccount(accountDetail) {
  let isAccount = isAccountExist(accountDetail, createAccounts);
  if (!isAccount) {
    createAccounts.push({ acountId: accountDetail[2], amount: 0 });
  }
  return isAccount;
}

function isAccountExist(accountDetails, createAccounts) {
  if (createAccounts?.accountId === accountDetails[2]) {
    return true;
  } else {
    return false;
  }
}

function calculateAmount(q, f, m) {
  let totalAmount = 0;
  if (m === "PAY") {
    totalAmount = f.amount - +q[3];
  }
  if (m === "DEPOSITE") {
    totalAmount = f.amount + +q[3];
  }
  return totalAmount;
}

function findExistingAccount(q) {
  let findedAccount = {};
  if (createAccounts && createAccounts.length) {
    findedAccount = createAccounts.find((item) => item.acountId === q[2]);
  }
  return findedAccount;
}

function calculateTopActivity(q) {
  let str = "";
  let length = q[2];
  let topActivity = [];

  for (let i = 0; i < length; i++) {
    topActivity.push(createAccounts[i]);
  }

  topActivity.sort((a, b) => a - b);

  topActivity.forEach((element, idx) => {
    str =
      str +
      element.acountId +
      "(" +
      element.amount +
      ")" +
      (idx < length - 1 ? ", " : "");
  });
  return str;
}

function addBankDetails(queries) {
  for (let i = 0; i < queries.length; i++) {
    let filterAccount = findExistingAccount(queries[i]);

    switch (queries[i][0]) {
      case "CREATE_ACCOUNT": {
        const isCreated = creatAccount(queries[i]);
        bankDetails.push(isCreated);
        break;
      }

      case "DEPOSITE": {
        if (filterAccount) {
          let totalAmount = calculateAmount(
            queries[i],
            filterAccount,
            "DEPOSITE"
          );
          bankDetails.push(totalAmount);
          filterAccount.amount = totalAmount;
        } else {
          bankDetails.push("");
        }

        break;
      }

      case "PAY": {
        if (filterAccount) {
          let totalAmount = calculateAmount(queries[i], filterAccount, "PAY");
          bankDetails.push(totalAmount);
          filterAccount.amount = totalAmount;
        } else {
          bankDetails.push("");
        }
        break;
      }

      case "TOP_ACTIVITY": {
        let topActivityString = calculateTopActivity(queries[i]);
        bankDetails.push(topActivityString);
        break;
      }
    }
  }
}

addBankDetails(queries);

console.log("bankDetails", bankDetails);
