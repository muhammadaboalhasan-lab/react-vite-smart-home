export function SaveAccounts(data) {
  const currentAccounts = GetAccounts(); // استخدم الدالة الجاهزة لديك

  const newAccount = {
    ...data,
    id: crypto.randomUUID(),
    createdDate: new Date().toISOString(),
  };

  localStorage.setItem(
    "accounts",
    JSON.stringify([...currentAccounts, newAccount]),
  );

  return newAccount; // نرجعه لنستخدمه في الـ dispatch
}

export function GetAccounts() {
  try {
    const data = localStorage.getItem("accounts");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error reading accounts from localStorage:", error);
    return [];
  }
}

export function GetActiveAccount() {
  const accounts = GetAccounts();

  return accounts.find((account) => account.isActive === true) || null;
}
