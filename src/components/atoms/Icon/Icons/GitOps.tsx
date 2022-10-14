const GitOps = ({width, height}: {width?: number; height?: number}) => {
  const iconWidth = width || '22';
  const iconHeight = height || '11';

  return (
    <svg width={iconWidth} height={iconHeight} viewBox="0 0 22 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20.9688 4.46875H16.4016C16.1619 3.21174 15.4913 2.0777 14.5053 1.262C13.5193 0.446294 12.2797 0 11 0C9.72033 0 8.48073 0.446294 7.49474 1.262C6.50875 2.0777 5.83811 3.21174 5.59836 4.46875H1.03125C0.757746 4.46875 0.495443 4.5774 0.302046 4.7708C0.108649 4.96419 0 5.22649 0 5.5C0 5.7735 0.108649 6.03581 0.302046 6.2292C0.495443 6.4226 0.757746 6.53125 1.03125 6.53125H5.59836C5.83811 7.78826 6.50875 8.92229 7.49474 9.738C8.48073 10.5537 9.72033 11 11 11C12.2797 11 13.5193 10.5537 14.5053 9.738C15.4913 8.92229 16.1619 7.78826 16.4016 6.53125H20.9688C21.2423 6.53125 21.5046 6.4226 21.698 6.2292C21.8913 6.03581 22 5.7735 22 5.5C22 5.22649 21.8913 4.96419 21.698 4.7708C21.5046 4.5774 21.2423 4.46875 20.9688 4.46875ZM11 8.9375C10.3201 8.9375 9.65552 8.73589 9.09023 8.35818C8.52493 7.98046 8.08434 7.44359 7.82416 6.81547C7.56399 6.18735 7.49591 5.49619 7.62855 4.82938C7.76119 4.16257 8.08858 3.55006 8.56932 3.06932C9.05006 2.58858 9.66257 2.26119 10.3294 2.12855C10.9962 1.99591 11.6874 2.06399 12.3155 2.32416C12.9436 2.58434 13.4805 3.02493 13.8582 3.59023C14.2359 4.15552 14.4375 4.82013 14.4375 5.5C14.4365 6.41136 14.074 7.2851 13.4295 7.92954C12.7851 8.57397 11.9114 8.93646 11 8.9375Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default GitOps;
