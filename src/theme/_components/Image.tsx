import React, {useState} from 'react';
import IdealImage from '@theme/IdealImage';
import {Lightbox} from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';

const useCloudflare = false;
export default function Image({img, alt, title, ...props}) {
  const [open, setOpen] = useState(false);
  const [fullImageURL, setFullImageURL] = useState('');

  const handleClick = (e) => {
    const hasImage = e.currentTarget.querySelector('img');
    if (!hasImage) return;
    let url = '';
    if (typeof img === 'string') {
      url = img;
    } else {
      const lengths = img?.src?.images?.length;
      url = img?.src?.images?.[lengths - 1]?.path || '';
    }

    setFullImageURL(url);
    setOpen(true);
  };

  return (
    <>
      <div style={{cursor: 'pointer'}} onClick={handleClick}>
        <IdealImage img={img} alt={alt} title={title} {...props} />
      </div>

      <Lightbox
        open={open}
        close={() => {
          setOpen(false);
        }}
        slides={[{src: fullImageURL}]}
        styles={{container: {backgroundColor: 'rgba(0, 0, 0, .8)'}}}
        controller={{
          aria: true,
          closeOnBackdropClick: true,
        }}
        carousel={{finite: true}}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
        }}
        plugins={[Zoom]}
      />
    </>
  );
}
