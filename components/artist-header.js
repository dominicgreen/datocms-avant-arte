
import CoverImage from '../components/cover-image'

export default function ArtistHeader({ coverImage }) {
  return (
    <>
     
      <div className="mb-8 md:mb-16 -mx-5 sm:mx-0">
        <CoverImage
          title="ddd"
          responsiveImage={coverImage.responsiveImage}
        />
      </div>
     
    </>
  )
}
