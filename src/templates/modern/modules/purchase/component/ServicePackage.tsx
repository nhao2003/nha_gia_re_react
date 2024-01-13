import PackageImage from '../../../assets/images/package.svg';
import checkIcon from '../../../assets/images/check-circle.svg';
import UnCheckIcon from '../../../assets/images/x-circle.svg';

export interface InfoItem {
  check: boolean;
  text: string;
}

export interface ServicePackageProps {
  name: string;
  price: string;
  description: string;
  infoList: InfoItem[];
  onButtonClick: () => void; // Prop callback cho button click
}

const ServicePackage: React.FC<ServicePackageProps> = ({ name, price, description, infoList, onButtonClick }) => (
  <div style={{ border: '2px solid #026D4D', padding: '16px', margin: '16px', borderRadius: '8px', textAlign: 'left' }}>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
        <img src={PackageImage} alt='Package' style={{ marginRight: '16px', width: '50px', height: '50px' }} />
        <div>
          <h3 style={{ fontSize: '1.5em', fontWeight: 'bold', color: '#026D4D', margin: '0' }}>{name}</h3>
          <div style={{ display: 'flex', alignItems: 'baseline', margin: '0' }}>
            <p style={{ fontSize: '1.5em', fontWeight: 'bold', color: '#026D4D', margin: '0', marginRight: '5px' }}>
              {price}
            </p>
            <p style={{ fontSize: '1em', fontWeight: 'bold', color: '#6A6A6A', margin: '0' }}>VNĐ/THÁNG</p>
          </div>
        </div>
      </div>
      <div style={{ margin: '0' }}>
        <p style={{ color: '#6A6A6A' }}>{description}</p>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '15px' }}>
          {infoList.map((info, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', margin: '5px 0' }}>
              {info.check ? (
                <img src={checkIcon} alt='Check Icon' style={{ marginRight: '5px' }} />
              ) : (
                <img src={UnCheckIcon} alt='UnCheck Icon' style={{ marginRight: '5px' }} />
              )}
              <p style={{ margin: '0', color: '#6A6A6A' }}>{info.text}</p>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            onClick={() => {
              onButtonClick();
            }}
            style={{
              width: '50%', // Chiều rộng 50%
              backgroundColor: '#026D4D',
              color: 'white',
              fontWeight: 'bold',
              borderRadius: '5px',
              height: '50px',
              boxShadow: 'none',
            }}
          >
            Mua ngay
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default ServicePackage;
