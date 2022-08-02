# noise-color-map

https://user-images.githubusercontent.com/33291896/182380633-0bdd5d5a-c23a-431c-a068-caaeb11b26ca.mov

사내 Web art 스터디에서 작업한 작품입니다.

## 작품 설명

동료의 작품을 보고 perlin noise에 대한 감명과 꿈 속에서 떠오른 이미지로 구성을 했습니다.

색상은 새로고침할때마다 바뀝니다. (이 perlin noise 라이브러리에서 제공하는 경우의 수가 65536개라 이 안에서 나올순 있음)

마우스를 올리면 해당되는 부분 + 십자 부분이 밝아지며, 마우스를 올린 부분은 초성으로, 십자 부분은 받침이 사라지고 초성 + 중성으로 변합니다.

## 코드 설명

색상은 hsl으로 hue 부분을 0~360 중에서 노이즈 펑션으로 x, y 좌표를 통해 계산하게 했고, saturation과 lightness는 기본적으로 50으로 지정합니다.

textContent는 0~11172(한글 글자수) 중 하나의 number를 노이즈 펑션으로 계산해서, char code를 이용해서 string으로 변환합니다.

마우스를 올리면, lightness를 85(hovered), 70(십자 부분)으로 바꾼 hsl를 다시 계산하여 backgroundColor로 부여합니다. 또한, textContent를 Hangul.js 라이브러리를 사용해서 초, 중, 종성을 나누고 각각 알맞게 초성이나 초+중성으로 변환합니다.

pure js dom으로 구현하여, 일부 스타일 지정이나 원래 상태로 복귀시키는 코드가 verbose할뿐, 특별한 설명은 필요 없을 것으로 보입니다.
