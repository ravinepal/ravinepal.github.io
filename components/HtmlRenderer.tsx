import markdownStyles from './markdown-styles.module.css'

type Props = {
  content: string
}

const HtmlRenderer = ({ content }: Props) => {
  return (
      <div
        className={markdownStyles['markdown']}
        dangerouslySetInnerHTML={{ __html: content }}
      />
  )
}

export default HtmlRenderer
