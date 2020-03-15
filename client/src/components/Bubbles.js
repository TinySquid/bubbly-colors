import React, { useState, useEffect } from "react";
import { Pack } from "@potion/layout";
import { Svg, Circle } from "@potion/element";

const Bubbles = ({ colors, refresh }) => {
  const [bubbleData, setBubbleData] = useState([]);
  useEffect(() => {
    const generateBubbleData = colors.map((_, i) => ({
      value: Math.floor(Math.random() * (colors.length * 2)) + 1,
      key: `${i + 2}`,
    }));
    setBubbleData(generateBubbleData);
  }, [colors, refresh]);

  return (
    <div className="bubble-wrap">
      <p>😃 bubbles 😃</p>
      <Svg width={400} height={400}>
        <Pack
          data={{
            children: bubbleData,
          }}
          sum={(datum) => datum.value}
          size={[400, 400]}
          includeRoot={false}
          nodeEnter={(d) => ({ ...d, r: 0 })}
          animate>
          {(nodes) =>
            nodes
              .map(({ x, y, r, key }, i) => {
                if (i < colors.length) {
                  return <Circle key={key} cx={x} cy={y} r={r} fill={colors[i].hex} />;
                }
                return null;
              })
              .filter((v) => v)
          }
        </Pack>
      </Svg>
    </div>
  );
};

export default Bubbles;
