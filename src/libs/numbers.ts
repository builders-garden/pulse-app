export function formatNumber(num) {
  if (num >= 1000) {
    let formattedNum = (num / 1000).toFixed(1);
    // Remove .0 if present
    if (formattedNum.endsWith('.0')) {
      formattedNum = formattedNum.substring(0, formattedNum.length - 2);
    }
    return formattedNum + 'k';
  } else {
    return num.toString();
  }
}
