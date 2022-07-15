import {reSize, Sizes, useHeaderHeight} from '../../utils';
import React, {FC, useContext} from 'react';
import {StyleSheet, useWindowDimensions, View} from 'react-native';
import Svg, {
  SvgProps,
  Path,
  Mask,
  G,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';

const offset = Sizes.HEADER_OFFSET;
const HeaderBackgroundSvg: FC<SvgProps> = props => {
  const {width} = useWindowDimensions();
  const {headerHeight} = useHeaderHeight();
  return (
    <View style={StyleSheet.absoluteFill}>
      <Svg
        width={width}
        height={headerHeight + offset}
        viewBox={`0 0 ${width} ${headerHeight + offset}`}
        {...props}>
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d={[
            'M0,0',
            `h${width}`,
            `v${headerHeight + offset}`,
            `Q${width} ${headerHeight},${width - offset} ${headerHeight}`,
            `H${offset}`,
            `Q0 ${headerHeight}, 0 ${headerHeight + offset}`,
            'h0',
            `H0z`,
          ].join(' ')}
          fill="url(#prefix__paint0_linear)"
        />
        <Mask
          id="prefix__a"
          x={0}
          y={0}
          width={width}
          height={headerHeight + offset}>
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d={[
              'M0,0',
              `h${width}`,
              `v${headerHeight + offset}`,
              `Q${width} ${headerHeight},${width - offset} ${headerHeight}`,
              `H${offset}`,
              `Q0 ${headerHeight}, 0 ${headerHeight + offset}`,
              'h0',
              `H0z`,
              // `V${headerHeight + offset}`,
              // `Q${width} ${headerHeight}, Q${width - offset} ${headerHeight}`,
              // `H${offset}`,
              // `Q0 ${headerHeight}, 0 ${headerHeight + offset}`,
            ].join(' ')}
            fill="#fff"
          />
        </Mask>
        <G mask="url(#prefix__a)" fillRule="evenodd" clipRule="evenodd">
          <Path
            d={`M${0} ${headerHeight + offset} Q${width / 2.7 / 2} ${
              headerHeight / 2
            } ${width / 2.7} ${headerHeight}z`}
            fill="url(#prefix__paint1_linear)"
          />
          <Path
            d={`M${width / 2.7} ${headerHeight} Q${
              width / 1
            } -10 ${width} 20 V${headerHeight}z`}
            fill="url(#prefix__paint2_linear)"
          />
        </G>
        <Defs>
          <LinearGradient
            id="prefix__paint0_linear"
            x1={121.135}
            y1={117.468}
            x2={185.554}
            y2={-29.478}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#4863DD" />
            <Stop offset={1} stopColor="#E87EF1" />
          </LinearGradient>
          <LinearGradient
            id="prefix__paint1_linear"
            x1={90.557}
            y1={-77.9}
            x2={-144.77}
            y2={99.252}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#4863DD" />
            <Stop offset={1} stopColor="#E87EF1" />
          </LinearGradient>
          <LinearGradient
            id="prefix__paint2_linear"
            x1={-48.813}
            y1={206.329}
            x2={52.28}
            y2={346.822}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#4863DD" />
            <Stop offset={1} stopColor="#E87EF1" stopOpacity={0.01} />
          </LinearGradient>
          <LinearGradient
            id="prefix__paint3_linear"
            x1={384.233}
            y1={219.856}
            x2={326.407}
            y2={20.237}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#4863DD" />
            <Stop offset={1} stopColor="#E87EF1" stopOpacity={0.01} />
          </LinearGradient>
        </Defs>
      </Svg>
    </View>
  );
};

const MemoHeaderBackgroundSvg = React.memo(HeaderBackgroundSvg);
export default MemoHeaderBackgroundSvg;
