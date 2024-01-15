export function formatMoney(amount: number): string {
  // Kiểm tra xem amount có phải là một số không
  if (isNaN(amount)) {
    return 'Invalid amount';
  }

  // Định dạng số tiền thành chuỗi và ngăn cách hàng nghìn bằng dấu '.'
  const formattedAmount: string = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return `${formattedAmount} VNĐ`;
}

export function formatDateTime(date: Date): string {
  const hours: string = String(date.getHours()).padStart(2, '0');
  const minutes: string = String(date.getMinutes()).padStart(2, '0');
  const day: string = String(date.getDate()).padStart(2, '0');
  const month: string = String(date.getMonth() + 1).padStart(2, '0');
  const year: number = date.getFullYear();

  return `${hours}:${minutes} ${day}/${month}/${year}`;
}
