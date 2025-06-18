import React, {useState} from 'react';
import IdealImage from '@theme/IdealImage';

const useCloudflare = false;
export default function Image({img, alt, title, ...props}) {
  const [showModal, setShowModal] = useState(false);
  const [fullImageURL, setFullImageURL] = useState('');

  const handleClick = () => {
    let url = '';
    if (typeof img === 'string') {
      url = img;
    } else {
      const lengths = img?.src?.images?.length;
      url = img?.src?.images?.[lengths - 1]?.path || '';
    }

    setFullImageURL(url);
    setShowModal(true);
  };

  return (
    <>
      <div style={{cursor: 'pointer'}} onClick={handleClick}>
        <IdealImage img={img} alt={alt} title={title} {...props} />
      </div>

      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.8)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => setShowModal(false)}>
          <button
            style={{
              position: 'absolute',
              top: 24,
              right: 24,
              height: '40px',
              width: '40px',
              background: 'none',
              border: 'none',
              color: '#fff',
              fontSize: '28px',
              cursor: 'pointer',
              zIndex: 10000,
              padding: 0,
              borderRadius: '50%',
              transition: 'background 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              lineHeight: 1,
            }}
            onClick={(e) => {
              e.stopPropagation();
              setShowModal(false);
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')
            }
            onMouseOut={(e) => (e.currentTarget.style.background = 'none')}
            aria-label="关闭图片预览">
            ×
          </button>
          <img
            src={fullImageURL}
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              objectFit: 'contain',
              borderRadius: 8,
            }}
            alt={alt}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
