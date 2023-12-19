class DateUtils {
  // get date ago
  getTimeAgoVi(date: Date): string {
    if (typeof date === 'string') {
      date = new Date(date);
    }

    if (!(date instanceof Date) || isNaN(date.getTime())) {
      console.log('Invalid date:', date);
      throw new Error('Invalid date');
    }

    const difference = new Date().getTime() - date.getTime();

    if (difference >= 365 * 24 * 60 * 60 * 1000) {
      const years = Math.floor(difference / (365 * 24 * 60 * 60 * 1000));
      return `${years.toString()} năm${years > 1 ? '' : ''} trước`;
    } else if (difference >= 30 * 24 * 60 * 60 * 1000) {
      const months = Math.floor(difference / (30 * 24 * 60 * 60 * 1000));
      return `${months.toString()} tháng${months > 1 ? '' : ''} trước`;
    } else if (difference >= 24 * 60 * 60 * 1000) {
      if (difference >= 2 * 24 * 60 * 60 * 1000) {
        return `${Math.floor(difference / (24 * 60 * 60 * 1000)).toString()} ngày${
          difference / (24 * 60 * 60 * 1000) > 1 ? '' : ''
        } trước`;
      } else {
        return 'Hôm qua';
      }
    } else if (difference >= 60 * 60 * 1000) {
      return `${Math.floor(difference / (60 * 60 * 1000)).toString()} giờ${
        difference / (60 * 60 * 1000) > 1 ? '' : ''
      } trước`;
    } else if (difference >= 60 * 1000) {
      return `${Math.floor(difference / (60 * 1000)).toString()} phút${difference / (60 * 1000) > 1 ? '' : ''} trước`;
    } else {
      return 'Bây giờ';
    }
  }

  private static readonly instance: DateUtils = new DateUtils();
  public static getInstance(): DateUtils {
    return DateUtils.instance;
  }
}

export default DateUtils.getInstance();
