import React from "react";
import { SvgXml } from "react-native-svg";

export default function Logo_dark() {
  const svgMarkup = `<svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12.3256 88.9206C12.3256 105.071 12.2868 121.217 12.2092 137.359C12.279 137.961 12.4178 138.554 12.6231 139.128L13.5931 141.083C14.8865 142.58 16.1022 144.089 17.3697 145.586L20.215 146.997L22.4655 147.269C23.4264 147.519 24.4091 147.684 25.4014 147.764C53.5963 147.764 81.7956 147.764 109.999 147.764C111.245 147.673 112.482 147.491 113.698 147.219L115.936 146.935L118.833 145.537L121.911 142.567C122.26 141.912 122.609 141.33 122.946 140.613L123.709 137.656C123.929 133.944 124.006 130.145 124.433 126.409C124.807 124.71 125.362 123.051 126.088 121.46L133.849 116.895C136.539 116.511 135.931 118.416 135.931 119.753C135.931 126.755 135.931 133.758 135.931 140.786L135.465 142.901L133.098 148.073L131.365 150.77L129.956 152.515L123.049 157.761L121.51 158.59L119.182 159.221L116.867 160H19.3873L17.0334 159.282C11.1077 157.284 6.11619 153.338 2.94886 148.147L1.84951 146.279L1.34511 144.46L0.0517578 140.749C0.0517578 109.446 0.0517578 78.1442 0.0517578 46.842L1.34511 43.0561L9.36386 31.9209L12.1963 30.2383L15.4943 28.7041L19.3744 27.4668L29.359 27.2441H106.701C110.762 28.4814 105.938 29.8918 106.701 31.2033C106.113 31.6661 105.602 32.2128 105.188 32.8241C102.343 38.9361 97.2856 39.864 90.8189 39.5918C80.1876 39.1464 69.5174 39.5918 58.8732 39.6908H57.153C45.7457 39.6166 34.3255 39.4805 22.9181 39.5176C21.4097 39.7396 19.9447 40.1775 18.5725 40.8167L16.6842 42.0539C15.6107 43.452 14.5243 44.8377 13.4379 46.2234L12.5067 48.2154C12.3774 54.3026 12.1575 60.3898 12.1187 66.477C12.1187 72.9478 12.2092 79.4062 12.2739 85.877L12.3256 88.9206Z" fill="white"/>
  <path d="M133.189 100.773C133.14 100.776 133.092 100.789 133.049 100.81C133.005 100.831 132.967 100.861 132.935 100.896C132.904 100.932 132.88 100.974 132.866 101.019C132.852 101.063 132.847 101.11 132.853 101.157L131.365 102.79L129.865 104.324L128.313 105.809L124.329 108.605L112.159 111.364L109.922 111.129C106.688 109.484 106.688 109.484 105.783 111.946L105.369 113.319L104.244 116.375L103.946 117.785L102.744 120.817L102.394 122.945L99.8982 128.253L89.0082 128.327L87.4174 126.632V125.135L89.5384 121.423L90.2498 120.458L91.8535 117.724L93.2892 115.249C94.104 113.851 94.9317 112.453 95.7465 111.043C95.9664 110.733 96.1863 110.412 96.3932 110.09C98.1392 108.036 100.622 106.019 96.7165 103.718L93.6513 99.3135L93.315 97.9278L92.0217 94.2161V84.5779C92.4614 82.8334 92.8882 81.0766 93.315 79.332L96.7295 74.049L99.5619 77.4391C99.5703 77.5341 99.6015 77.6259 99.6531 77.7075C99.7047 77.789 99.7753 77.8581 99.8594 77.9092L101.217 79.5671L102.239 80.8044L105.615 85.5677L106.908 84.8501L105.822 81.6333L105.485 78.8124L104.321 70.5353C104.179 69.1001 104.05 67.6772 103.908 66.242C104.632 62.5303 102.381 58.4598 105.201 54.9337L106.042 53.449L107.503 51.2219C107.59 51.178 107.667 51.1166 107.727 51.0419C107.787 50.9672 107.83 50.8809 107.852 50.7889L109.055 48.9949L110.607 46.8421L111.616 45.6049L112.909 43.8975C113.063 43.7584 113.156 43.5679 113.168 43.3654L114.461 41.6828L115.923 39.9259L117.63 40.0373C118.725 44.2934 119.829 48.5495 120.941 52.8056H122.234C122.622 50.2569 122.997 47.7082 123.385 45.1594L123.631 43.0561L126.464 28.8774L126.683 27.5288C128.779 25.0543 130.87 22.5798 132.956 20.1053L134.469 18.633L143.083 10.4548L144.635 9.00726L147.222 6.99056L152.395 3.10562L154.089 1.86838C154.161 1.79053 154.248 1.72737 154.346 1.68272C154.444 1.63806 154.55 1.61283 154.658 1.60856L157.879 0.0620117L159.845 0.631143C159.767 4.34287 159.638 8.12882 159.638 11.8777C159.638 13.6593 159.871 15.4409 160 17.2225L159.625 22.1715L156.185 28.7907L153.598 31.0425L149.201 34.7543L147.661 36.2142L146.368 37.2658L144.739 38.6887L143.083 40.0744L140.496 42.1653L138.634 43.947L139.345 44.8006L142.514 43.5634L143.924 43.3283L154.904 42.1777L155.318 46.0379L155.163 47.3494L153.805 52.6695L153.598 54.0057L149.343 66.007L146.86 67.9494L136.151 77.0432L134.314 78.2804L133.111 79.2949L130.15 81.5591C130.052 81.5732 129.963 81.6192 129.897 81.6891C129.831 81.759 129.792 81.8485 129.787 81.9426L127.796 83.6995L128.339 84.3058L130.007 83.7366L133.021 83.4892L140.781 82.2519L143.174 84.4666L138.776 92.6819L137.263 95.1564L135.97 96.9875L134.431 99.0908C134.03 99.6104 133.616 100.192 133.189 100.773Z" fill="white"/>
  <path d="M31.5577 91.0733L34.7911 87.8565C47.3495 87.7575 59.9079 87.7451 72.4663 87.4976C76.4886 87.4234 79.7995 87.6461 79.7737 92.5827C79.9159 94.0427 80.0453 95.5026 80.1876 96.9502L80.5238 98.5957C79.2202 99.1904 77.8357 99.6069 76.411 99.8329C63.3352 99.9814 50.2595 100.006 37.1837 100.068L34.804 99.5607L31.4283 95.6016L31.5577 91.0733Z" fill="white"/>
  <path d="M86.4344 62.1958L85.8912 63.8042C85.029 65.8086 84.1668 67.8088 83.3045 69.8048L82.9424 70.5967C81.1447 70.6709 79.3598 70.8194 77.5621 70.8318C63.5767 70.9225 49.5913 70.9926 35.6059 71.0421L32.8899 69.4832L31.493 62.1958L34.804 59.0532C40.443 59.0532 46.0691 59.0532 51.7081 59.0532C63.6198 59.0532 75.5315 59.2141 87.4433 59.2883V60.7606L86.4344 62.1958Z" fill="white"/>
  <path d="M32.3855 118.404L34.0409 116.895H76.7214L75.5315 120.829L75.247 122.202C74.8331 123.303 73.9536 124.466 74.1088 125.493C74.4322 127.968 72.919 128.327 71.0565 128.586C60.3735 128.586 49.6904 128.586 39.0203 128.389C37.1481 128.16 35.3059 127.745 33.5236 127.151C31.1697 124.504 31.2732 121.509 32.3855 118.404Z" fill="white"/>
  <path d="M126.528 28.8647L123.683 43.0435L126.528 28.8647Z" fill="white"/>
  <path d="M149.343 65.9944C150.765 62.0022 152.184 58.0018 153.598 53.9932C152.175 57.9936 150.757 61.994 149.343 65.9944Z" fill="white"/>
  <path d="M133.021 20.1299C130.943 22.6044 128.852 25.0788 126.748 27.5533C128.843 25.0788 130.934 22.6044 133.021 20.1299Z" fill="white"/>
  <path d="M104.283 70.436L105.447 78.7132L104.283 70.436Z" fill="white"/>
  <path d="M138.776 92.6816L143.174 84.4663L138.776 92.6816Z" fill="white"/>
  <path d="M140.82 82.2021L133.06 83.4394L140.82 82.2021Z" fill="white"/>
  <path d="M83.2397 69.756L85.8264 63.7554L83.2397 69.756Z" fill="white"/>
  <path d="M153.805 52.657L155.163 47.3369L153.805 52.657Z" fill="white"/>
  <path d="M133.098 148.061L135.465 142.889L133.098 148.061Z" fill="white"/>
  <path d="M149.252 34.8162L153.65 31.1045L149.252 34.8162Z" fill="white"/>
  <path d="M93.6512 99.3135L96.7423 103.755L93.6512 99.3135Z" fill="white"/>
  <path d="M99.5878 77.3148L96.7554 73.9248L99.5878 77.3148Z" fill="white"/>
  <path d="M124.342 108.58L128.326 105.784L124.342 108.58Z" fill="white"/>
  <path d="M95.7723 111.018C94.9575 112.428 94.1298 113.826 93.3149 115.224C94.1298 113.826 94.9575 112.428 95.7723 111.018Z" fill="white"/>
  <path d="M89.5643 121.373L87.4432 125.085L89.5643 121.373Z" fill="white"/>
  <path d="M19.3872 27.4668L15.5072 28.704L19.3872 27.4668Z" fill="white"/>
  <path d="M0.0388184 140.662L1.33217 144.374L0.0388184 140.662Z" fill="white"/>
  <path d="M1.29335 42.9697L0 46.7557L1.29335 42.9697Z" fill="white"/>
  <path d="M102.705 120.816L103.908 117.785L102.705 120.816Z" fill="white"/>
  <path d="M104.205 116.375L105.33 113.319L104.205 116.375Z" fill="white"/>
  <path d="M157.853 0L154.633 1.5713L157.853 0Z" fill="white"/>
  <path d="M130.15 81.5589L133.124 79.3442L130.15 81.5589Z" fill="white"/>
  <path d="M12.1446 30.2134L9.31213 31.896L12.1446 30.2134Z" fill="white"/>
  <path d="M20.215 146.996L17.3696 145.586L20.215 146.996Z" fill="white"/>
  <path d="M147.209 6.97803L144.622 8.99473L147.209 6.97803Z" fill="white"/>
  <path d="M118.872 145.574L115.923 146.972L118.872 145.574Z" fill="white"/>
  <path d="M146.873 67.9366L149.356 65.9941L146.873 67.9366Z" fill="white"/>
  <path d="M91.8794 117.674L90.2756 120.408L91.8794 117.674Z" fill="white"/>
  <path d="M34.804 99.499L37.1837 100.006L34.804 99.499Z" fill="white"/>
  <path d="M17.0333 159.245L19.3872 159.963L17.0333 159.245Z" fill="white"/>
  <path d="M116.867 159.938L119.182 159.159L116.867 159.938Z" fill="white"/>
  <path d="M107.438 51.1226L105.977 53.3496L107.438 51.1226Z" fill="white"/>
  <path d="M110.568 46.7061L109.016 48.8589L110.568 46.7061Z" fill="white"/>
  <path d="M136.021 96.9381L137.315 95.1069L136.021 96.9381Z" fill="white"/>
  <path d="M101.243 79.4431L99.8853 77.7852L101.243 79.4431Z" fill="white"/>
  <path d="M108.99 48.8955L107.788 50.6895L108.99 48.8955Z" fill="white"/>
  <path d="M12.5583 48.2649L13.4896 46.2729L12.5583 48.2649Z" fill="white"/>
  <path d="M112.858 43.7363L111.564 45.4437L112.858 43.7363Z" fill="white"/>
  <path d="M114.422 41.522L113.129 43.2046L114.422 41.522Z" fill="white"/>
  <path d="M143.083 40.0742L144.738 38.6885L143.083 40.0742Z" fill="white"/>
  <path d="M122.984 140.649C122.648 141.305 122.299 141.887 121.95 142.604C122.299 141.949 122.648 141.305 122.984 140.649Z" fill="white"/>
  <path d="M144.739 38.6885L146.329 37.2285L144.739 38.6885Z" fill="white"/>
  <path d="M131.365 102.79L132.853 101.157L131.365 102.79Z" fill="white"/>
  <path d="M147.661 36.214L149.214 34.8901L147.661 36.214Z" fill="white"/>
  <path d="M16.7358 42.1035L18.6241 40.8662L16.7358 42.1035Z" fill="white"/>
  <path d="M129.865 104.324L131.365 102.79L129.865 104.324Z" fill="white"/>
  <path d="M13.5931 141.083L12.623 139.128L13.5931 141.083Z" fill="white"/>
  <path d="M86.4344 62.1964L87.4691 60.7983L86.4344 62.1964Z" fill="white"/>
  <path d="M129.956 152.515L131.365 150.795L129.956 152.515Z" fill="white"/>
  <path d="M134.547 18.5957L133.034 20.1299L134.547 18.5957Z" fill="white"/>
  <path d="M144.648 8.99463L143.083 10.4546L144.648 8.99463Z" fill="white"/>
  <path d="M121.51 158.552L123.049 157.723L121.51 158.552Z" fill="white"/>
  <path d="M117.669 40.0369L115.923 39.9255L117.061 38.9233L117.669 40.0369Z" fill="white"/>
  <path d="M128.326 105.797L129.878 104.312L128.326 105.797Z" fill="white"/>
  <path d="M80.5238 98.5957L80.1875 96.9502L80.5238 98.5957Z" fill="white"/>
  <path d="M154.064 1.80664L152.369 3.04388L154.064 1.80664Z" fill="white"/>
  <path d="M133.189 100.773C133.616 100.192 134.043 99.6101 134.482 99.041L133.189 100.773Z" fill="white"/>
  <path d="M134.314 78.2802L136.151 77.043L134.314 78.2802Z" fill="white"/>
  <path d="M1.84949 146.254L2.94883 148.123L1.84949 146.254Z" fill="white"/>
  </svg>  
  `;
  const SvgImage = () => <SvgXml xml={svgMarkup} width="160px" />;

  return <SvgImage />;
}
