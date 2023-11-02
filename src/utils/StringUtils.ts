class StringUtils {
  capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  reverse(str: string): string {
    return str.split('').reverse().join('')
  }

  isPalindrome(str: string): boolean {
    const reversed = this.reverse(str)
    return str === reversed
  }
}

export default new StringUtils()
