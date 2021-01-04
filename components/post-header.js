import DateFormatter from '../components/date-formatter'
import CoverImage from '../components/cover-image'
import PostTitle from '../components/post-title'
import Author from './author'

export default function PostHeader({ title, coverImage, date, author }) {
  return (
    <div className="max-w-4xl mx-auto">
      <PostTitle>{title}</PostTitle>
      <div className="mb-3 text-lg text-gray-500">
        <DateFormatter dateString={date} />
      </div>
      <div className="hidden md:block md:mb-12">
        <Author name={author.name} picture={author.picture} size={'sm'} />
      </div>
      {coverImage && <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} src={coverImage} height={620} width={1240} />
      </div>}
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6">
          <Author name={author.name} picture={author.picture} />
        </div>
      </div>
    </div>
  )
}
