import { Helmet } from 'react-helmet'

interface MetaProps {
  title?: string
  description?: string
  keywords?: string
}

const Meta = ({ title, description, keywords }: MetaProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Notely',
  description: 'Collaborate with friends and make studying fun with Notely',
  keywords: 'notes, study, productivity',
}

export default Meta
