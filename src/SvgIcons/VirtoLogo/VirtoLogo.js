import * as React from "react";

import PropTypes from "prop-types";
import SvgIcon from "@mui/material/SvgIcon";

// Virto logo svg
function Icon(props) {
  return (
    <SvgIcon viewBox="0 0 164 36" {...props}>
      <path d="M124.58 0H93.2086C92.5382 0.00459184 92.0928 0.707143 92.3775 1.31327L94.88 6.68112C95.0316 7.00255 95.3576 7.21378 95.7112 7.21378H105.556V35.077C105.556 35.5867 105.969 35.9954 106.474 35.9954H111.314C111.819 35.9954 112.233 35.5821 112.233 35.077V7.21378H122.077C122.436 7.20918 122.757 6.99796 122.909 6.67653L125.411 1.30867C125.696 0.697959 125.25 0 124.58 0Z" />
      <path d="M162.633 6.60305C162.114 5.28979 161.416 4.15101 160.539 3.18213C159.662 2.21326 158.624 1.44642 157.43 0.877031C156.236 0.307643 154.969 0.0229492 153.619 0.0229492H137.318C135.968 0.0229492 134.701 0.307643 133.507 0.877031C132.313 1.44642 131.28 2.21785 130.398 3.18213C129.521 4.15101 128.823 5.28979 128.304 6.60305C127.785 7.91632 127.528 9.31683 127.528 10.8V25.2138C127.528 26.7015 127.785 28.102 128.304 29.4153C128.823 30.7286 129.521 31.8719 130.398 32.8362C131.275 33.8051 132.313 34.5719 133.507 35.1413C134.701 35.7107 135.968 35.9954 137.318 35.9954H153.619C154.969 35.9954 156.236 35.7107 157.43 35.1413C158.624 34.5719 159.657 33.8005 160.539 32.8362C161.416 31.8673 162.114 30.7286 162.633 29.4153C163.152 28.102 163.409 26.7015 163.409 25.2138V10.8C163.409 9.31223 163.147 7.91632 162.633 6.60305ZM156.865 25.2138C156.865 26.2148 156.553 27.0643 155.924 27.753C155.295 28.4464 154.528 28.7908 153.619 28.7908H137.318C136.409 28.7908 135.637 28.4464 135.013 27.753C134.384 27.0643 134.071 26.2148 134.071 25.2138V10.8C134.071 9.79897 134.384 8.94948 135.013 8.2607C135.642 7.57193 136.409 7.22295 137.318 7.22295H153.619C154.528 7.22295 155.295 7.56734 155.924 8.2607C156.553 8.95407 156.865 9.79897 156.865 10.8V25.2138Z" />
      <path d="M87.3678 3.18213C86.4724 2.21326 85.4163 1.44642 84.1995 0.877031C82.9826 0.307643 81.6832 0.0229492 80.3102 0.0229492H55.7577C55.0872 0.0229492 54.6418 0.716317 54.9219 1.32703L57.3923 6.69489C57.5439 7.02091 57.8699 7.22754 58.2281 7.22754H80.3102C81.2377 7.22754 82.023 7.57193 82.6658 8.2653C83.3041 8.95866 83.6255 9.80356 83.6255 10.8046C83.6255 11.8056 83.3041 12.6643 82.6658 13.3714C82.023 14.0786 81.2423 14.4321 80.3102 14.4321H64.3168C62.9393 14.4321 61.6444 14.7168 60.4275 15.2862C59.2107 15.8556 58.1546 16.627 57.2592 17.5913C56.3638 18.5602 55.652 19.699 55.124 21.0122C54.5959 22.3255 54.3296 23.726 54.3296 25.2138V35.077C54.3296 35.5867 54.7429 35.9954 55.248 35.9954H60.0878C60.5929 35.9954 61.0061 35.5821 61.0061 35.077V25.2138C61.0061 24.2127 61.3275 23.3633 61.9658 22.6745C62.6041 21.9857 63.3893 21.6367 64.3214 21.6367H71.4801C71.7786 21.6367 72.0633 21.7837 72.2332 22.0316L81.674 35.6051C81.8439 35.8531 82.1286 36 82.427 36H88.548C89.2918 36 89.7235 35.1643 89.301 34.5536L80.3148 21.6367C81.6923 21.6367 82.9872 21.352 84.2041 20.7826C85.4209 20.2133 86.477 19.4326 87.3724 18.45C88.2679 17.4627 88.9796 16.3148 89.5076 15.0015C90.0357 13.6883 90.302 12.2877 90.302 10.8C90.302 9.31223 90.0357 7.91632 89.5076 6.59846C88.9796 5.28519 88.2679 4.14642 87.3724 3.17754L87.3678 3.18213Z" />
      <path d="M42.5148 0.00898637H47.3546C47.8643 0.00898637 48.273 0.422252 48.273 0.927354V35.0768C48.273 35.5865 47.8597 35.9952 47.3546 35.9952H42.5148C42.0097 35.9952 41.5964 35.5819 41.5964 35.0768V0.922762C41.5964 0.41766 42.0097 0.00439453 42.5148 0.00439453V0.00898637Z" />
      <path d="M34.5571 0.00927734H29.6714C29.1617 0.00927734 28.7439 0.3904 28.7439 0.858767V6.65826C28.7439 9.09652 28.6061 11.2317 28.3306 13.0776C28.3076 13.2292 28.2847 13.3899 28.2617 13.5414C27.9403 15.4838 27.3709 17.2516 26.5673 18.8404C25.7546 20.4384 24.6571 21.9537 23.2658 23.3863C22.0811 24.6123 21.2592 25.7144 19.101 26.9266C18.8484 27.069 18.5775 27.1562 18.2974 27.1929C18.2102 27.2067 18.1229 27.2113 18.0403 27.2113C17.953 27.2113 17.8658 27.2067 17.7786 27.1929C17.4984 27.1562 17.2275 27.069 16.975 26.9266C14.8168 25.7144 13.9949 24.6123 12.8102 23.3863C11.4189 21.9537 10.3214 20.4384 9.50865 18.8404C8.70508 17.2516 8.13569 15.4838 7.81427 13.5414C7.79131 13.3899 7.76835 13.2292 7.74539 13.0776C7.46988 11.2317 7.33212 9.09652 7.33212 6.65826V0.858767C7.33212 0.3904 6.91427 0.00927734 6.40457 0.00927734H1.51886C1.00457 0.00927734 0.591309 0.3904 0.591309 0.858767V4.98224C0.591309 8.32968 0.752023 11.2868 1.07345 13.8491C1.39488 16.4159 2.04692 18.7807 3.02039 20.948C3.98927 23.1154 5.35763 25.1725 7.1209 27.1149C8.12192 28.2123 9.34335 29.42 10.6979 30.669C12.2362 32.0878 13.8755 33.3965 15.5745 34.6134L16.9796 35.619C17.6362 36.1241 18.4352 36.1241 19.0964 35.619L20.5015 34.6134C22.2005 33.3965 23.8398 32.0878 25.378 30.669C26.7326 29.42 27.9541 28.2123 28.9551 27.1149C30.7183 25.1725 32.0867 23.1154 33.0556 20.948C34.0291 18.7807 34.6811 16.4159 35.0025 13.8491C35.324 11.2868 35.4847 8.32968 35.4847 4.98224V0.858767C35.4847 0.3904 35.0714 0.00927734 34.5571 0.00927734Z" />
    </SvgIcon>
  );
}

// Virto logo component
export default function VirtoLogo({ sx }) {
  return <Icon sx={sx} />;
}

VirtoLogo.propTypes = {
  /**
   * styles applied to the svg element
   */
  sx: PropTypes.object
};
