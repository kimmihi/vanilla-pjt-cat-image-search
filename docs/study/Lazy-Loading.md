# Lazy Loading 구현하기

> 검색된 결과에 대해 `Lazy Loading`개념을 이용하여 이미지가 보여야할 시점에 load될 수 있도록 하라는 요구가 있었다.

### Lazy Loading?

수많은 콘텐츠가 포함된 웹 페이지를 로드할 때 당장 유저에게 보여지지 않는 부분의 콘텐츠까지 로드할 필요가 있을까?
위 아래로 스크롤이 발생할 정도로 많은 이미지를 출력하는 페이지에서 사용자가 스크롤을 내리지 않고 현재 화면의 이미지들만 보고 다른 페이지로 이동한다면 나머지 이미지들은 로드될 필요가 없었다.

이처럼 사용자에게 보여질 콘텐츠를 빠르게 보여주고 메모리 낭비를 줄이기위해 현재 보여지는 화면의 콘텐츠만 로드하는 것을 `Lazy Loading`이라고 한다.

### IntersectionObserver API로 구현하기

`IntersectionObserver`는 타겟요소와 상위 요소의 Viewport 사이의 intersection(교차 영역)내의 변화를 비동기적으로 관찰할 수 있게 도와주는 Web API다.

이를 활용한다면 검색 결과의 이미지들과 현재 Viewport의 교차 영역의 변화를 감지하여 교차했을 때 이미지를 로드할 수 있도록 할 수 있다.

- **observer 생성**
  `observer`를 생성하고, 콜백함수에서 타겟이 교차했을 때 `dataset`의 이미지 소스를 타겟의 소스에 대입하여 이미지가 로드될 수 있도록 한다. 또한, 해당 타겟의 `observer`를 해지하여 다시 교차했을 때 이미지를 또 불러오지 않도록 한다.(이미 이전에 교차했을 때 이미지가 로드되었기 때문에 불필요)

```javascript
this.observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      // 타겟이 교차했을 때
      if (entry.isIntersecting) {
        entry.target.src = entry.target.dataset.src;
        observer.unobserve(entry.target);
      }
    });
  },
  {
    root: null,
    rootMargin: "0px 0px 30px 0px",
    threshold: 0.2,
  }
);
```

- **검색 결과 타겟에 `observer`추가하기**
  `img`요소를 생성하고 해당 이미지에 `dataset`으로 `src`속성을 추가한다. 위에서 교차했을 때 타겟의 `src`를 가져오기 위함이다. 그리고 해당 타겟 이미지를 `observer`로 관찰하도록 한다.

```javascript
this.#catList.forEach((cat) => {
  const image = document.createElement("img");
  image.className = "CatImage";
  image.setAttribute("data-src", cat.url);

  image.addEventListener("click", () => {
    this.onClick(cat.id);
  });

  this.observer.observe(image);
  frag.appendChild(image);
});
```

위의 두 단계를 통해 스크롤을 내려 타겟과 최상단 document의 viewport가 교차했을 때 이미지를 불러오도록 할 수 있다.
