API List:
Properties:
1. canvas
```javascript
  var ctx = canvas.getContext('2d');
  ctx.canvas === canvas;
```

2. fillStyle
```javascript
  ctx.fillStyle = color;
  ctx.fillStyle = gradient;
  ctx.fillStyle = pattern;
```

3. font
```javascript
  ctx.font = '10px sans-serif';
  ctx.strokeText('Hello world', 50, 100);
```

4. globalAlpha
```javascript
  ctx.globalAlpha = 0.5; // 0.0 - 1.0
  ctx.fillStyle = 'red';
  ctx.fillRect(10, 10, 100, 100);
```

5. globalCompositeOperation
``source-over`` This is the default setting and draws new shapes on top of the existing canvas content.
``source-in`` The new shape is drawn only where both the new shape and the destination canvas overlap. Everything else is made transparent.
``source-out`` The new shape is drawn where it doesn't overlap the existing canvas content.
``source-atop`` The new shape is only drawn where it overlaps the existing canvas content.
``destination-over`` New shapes are drawn behind the existing canvas content.
``destination-in`` The existing canvas content is kept where both the new shape and existing canvas content overlap. Everything else is made transparent.
``destination-out`` The existing content is kept where it doesn't overlap the new shape.
``destination-atop`` The existing canvas is only kept where it overlaps the new shape. The new shape is drawn behind the canvas content.
``lighter`` Where both shapes overlap the color is determined by adding color values.
``copy`` Only the new shape is shown.
``xor`` Shapes are made transparent where both overlap and drawn normal everywhere else.
``multiply`` The pixels are of the top layer are multiplied with the corresponding pixel of the bottom layer. A darker picture is the result.
``screen`` The pixels are inverted, multiplied, and inverted again. A lighter picture is the result (opposite of multiply)
``overlay`` A combination of multiply and screen. Dark parts on the base layer become darker, and light parts become lighter.
``darken`` Retains the darkest pixels of both layers.
``lighten`` Retains the lightest pixels of both layers.
``color-dodge`` Divides the bottom layer by the inverted top layer.
``color-burn`` Divides the inverted bottom layer by the top layer, and then inverts the result.
``hard-light`` A combination of multiply and screen like overlay, but with top and bottom layer swapped.
``soft-light`` A softer version of hard-light. Pure black or white does not result in pure black or white.
``difference`` Subtracts the bottom layer from the top layer or the other way round to always get a positive value.
``exclusion`` Like difference, but with lower contrast.
``hue`` Preserves the luma and chroma of the bottom layer, while adopting the hue of the top layer.
``saturation`` Preserves the luma and hue of the bottom layer, while adopting the chroma of the top layer.
``color`` Preserves the luma of the bottom layer, while adopting the hue and chroma of the top layer.
``luminosity`` Preserves the hue and chroma of the bottom layer, while adopting the luma of the top layer.


```javascript
  ctx.globalCompositeOperation = 'xor';

  ctx.fillStyle = 'blue';
  ctx.fillRect(10, 10, 100, 100);

  ctx.fillStyle = 'blue';
  ctx.fillRect(50, 50, 100, 100);
```

6. lineCap
```javascript
  ctx.lineCap = 'round';// butt-default || round || square
```
7. lineDashOffset
```javascript
  ctx.setLineDash = ([4, 16]);
  ctx.lineDashOffset = 4;
```

8. lineJoin
```javascript
  ctx.lineJoin = 'round'; // round || bevel || miter-default
```

9. miterLimit
```javascript
  ctx.miterLimit = 10; // default
```

10. shadowBlur
```javascript
  ctx.shadowColor = '#00f';
  ctx.shadowBlur = 15; // default 0
```

11. shadowColor

12. shadowOffsetX

13. shadowOffsetY

14. strokeStyle
```javascript
  ctx.strokeStyle = 'red'; // color || gradient || pattern
```

15. textAlign
```javascript
  ctx.textAlign = 'left'; // left || right || center || start || end
```

16. textBaseline
```javascript
  ctx.textBaseline = 'top'; // top || hanging || middle || alphabetic || ideographic || bottom
```

Methods:
17. arc()
```javascript
  ctx.arc(x, y, radius, startAngle, endAngle [, anticlockwise]);
```

18. arcTo()
```javascript
  ctx.arcTo(x1, y1, x2, y2, radius);
```

19. beginPath()
```javascript
  ctx.beginPath();
  ctx.moveTo(20, 20);
  ctx.lineTo(120, 120);
  ctx.stroke();
```

20. bezierCurveTo()
```javascript
  ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
```

21. clearRect()
```javascript
  ctx.clearRect(x, y, width, height);
```

22. clip()

23. closePath()

24. createImageData()

25. createLinearGradient()

26. createPattern()

27. createRadialGradient()

28. drawFocusIfNeeded()

29. drawImage()

30. ellipse()

31. fill()

32. fillRect()

33. fillText()

34. getImageData()

35. getLineDash()

36. isPointInPath()

37. isPointInStroke()

38. lineTo()

39. measureText()

40. moveTo()

41. putImageData()

42. quadraticCurveTo()

43. rect()

44. restore()

45. rotate()

46. save()

47. scale()

48. setLineDash()

49. setTransform()

50. stroke()

51. strokeRect()

52. strokeText()

53. transform()

54. translate()
