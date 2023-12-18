import DOMPurify from 'dompurify';
interface HtmlContentProps {
  html: string;
}
export function HtmlContent({ html }: HtmlContentProps) {
  const sanitizedHtml = DOMPurify.sanitize(html);
  const style = {
    width: '100%',
  };

  const setWidthForImages = (content: string) => {
    // Đặt chiều rộng cho tất cả các ảnh trong nội dung HTML
    const modifiedContent = content.replace(/<img/g, '<img style="width: 100%;"');
    return { __html: modifiedContent };
  };

  const modifiedHtml = setWidthForImages(sanitizedHtml);

  return (
    <div
      id="blogs-html-content"
      className="blogs-html-content"
      style={style}
      dangerouslySetInnerHTML={modifiedHtml}
    />
  );
}