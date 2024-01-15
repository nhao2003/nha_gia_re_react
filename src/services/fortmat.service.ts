export function formatMoney(amount: number): string {
  // Kiểm tra xem amount có phải là một số không
  if (isNaN(amount)) {
    return 'Invalid amount';
  }

  // Định dạng số tiền thành chuỗi và ngăn cách hàng nghìn bằng dấu '.'
  const formattedAmount: string = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return `${formattedAmount} VNĐ`;
}
