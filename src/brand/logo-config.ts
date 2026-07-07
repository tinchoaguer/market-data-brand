import type { LogoConfig } from './types.ts'

export const defaultLogoConfig: LogoConfig = {
    "canvas": {
      "size": 512,
      "cornerRadius": 24
    },
    "chart": {
      "origin": {
        "x": 130,
        "y": 2
      },
      "barsOffset": {
        "x": 0,
        "y": 250
      },
      "trendOffset": {
        "x": 0,
        "y": 20
      },
      "barWidth": 34,
      "barGap": 32,
      "barRadius": 8,
      "baselineY": 225,
      "bars": [
        {
          "height": 175,
          "color": "bar1"
        },
        {
          "height": 209,
          "color": "bar2"
        },
        {
          "height": 188,
          "color": "bar3"
        },
        {
          "height": 224,
          "color": "bar4"
        },
        {
          "height": 268,
          "color": "bar5"
        }
      ]
    },
    "trend": {
      "points": [
        {
          "x": 0,
          "y": 219
        },
        {
          "x": 66,
          "y": 180
        },
        {
          "x": 134,
          "y": 201
        },
        {
          "x": 200,
          "y": 160
        },
        {
          "x": 280,
          "y": 80
        }
      ],
      "strokeWidth": 14,
      "arrowStrokeWidth": 5,
      "arrowHeadLength": 24,
      "arrowHeadWidth": 18,
      "nodeRadius": 9
    },
    "lens": {
      "cx": 256,
      "cy": 240,
      "r": 180,
      "rotation": -15,
      "magnification": 1.29,
      "clipInset": 12
    },
    "magnifyingGlass": {
      "ringBgStroke": 34,
      "ringFgStroke": 20,
      "handleNarrow": {
        "angleDeg": 45,
        "overlapOffset": 0,
        "length": 100,
        "strokeWidth": 10,
        "bgStroke": 16
      },
      "handleBottom": {
        "angleDeg": 45,
        "overlapOffset": 40,
        "length": 100,
        "strokeWidth": 40,
        "bgStroke": 60
      }
    }
}