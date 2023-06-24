---
# week4 : Food Delivery Service

## 구현 기능

1. 입력 값에 따른 새로고침 없이 바로 메뉴 검색 
2. 입력 값에 따라 더미데이터에 있는 메뉴 자동완성
    - 자동 완성 클릭 시 해당 메뉴 렌더링

## 변경 및 추가된 컴포넌트

- MenuProvider.js
- Meals.js
- AvailableMeals.js
- MenuSearch.js

### 구현 목표

- useContext, context, Provider에 대한 이해
- 이를 사용할 때 컴포넌트 간 로직 흐름의 이해
- 전역 관리의 필요성 이해

---

### **MenuProvider 컴포넌트**

- 음식 관련 상태와 함수를 관리하기 위한 컨텍스트(provider) 역할
- createContext()를 사용해서 `MenuContext` 생성 → 이 Context는 MenuProvider에서 생성된 **state와 state 함수를 자식들과 공유**하기 위해 사용
    - 현재 사용자가 검색하기 위해 입력하는 값, 그리고 메뉴들을 렌더링 하는 것이 컴포넌트가 나뉘어져 있어서 전역 변수 관리가 필요하다고 판단하여 만들었다.
    - 또한 이에 따른 상태 관리 함수 handleSearch를 만들었다.
- MenuProvider는 children의 prop을 받아와서 자식 컴포넌트를 렌더링
    - MenuProvider 내에서 **MenuContext.Provider**를 사용하여 state와 함수를 자식들에게 제공
    - 이를 통해 자식들이 MenuContext를 통해서 menuSearch와 handleSearch 함수에 접근할 수 있는 것이다.


---

### **Meals 컴포넌트**

- **`MenuProvider`**로 **`MenuContext`**를 제공하고, **`MealsSummary`**, **`MenuSearch`**, **`AvailableMeals`** 컴포넌트를 렌더링
- MenuSearch와 AvailableMeals에서 dummy data를 같이 사용하기 위해 이곳에 옮김
    - 아예 다른 파일에 하는 것이 더 좋음
- `MenuProvider` 를 사용하여 `MenuSearch` , `AvailableMeals` 에서 context를 사용하여 `menuSearch` (사용자가 input에 입력한 메뉴 검색값) state와 `handleSearch` 함수를 사용할 수 있도록 함

<aside>
❓ Fragment 사용이 꼭 좋은 것일까? div를 써도 구조가 명확하고 추가적인 요소나 로직이 필요 없는 상황에서도 꼭 써야할까?

</aside>


---

### AvailableMeals 컴포넌트

- useContext(MenuContext)를 사용해서 MenuProvider에서 제공하는 `meneSearch` 값을 가져온다.
- filteredMenu 함수
    - 더미데이터를 filter하는데 filter하기 전에 `menuSearch` 가 비어있지 않은 경우에, 즉 여기에 들어있는 것을 포함하는 이름으로 필터링한다.
    - 그렇지 않은 경우 원본 배열 그대로 사용
- mealsList 함수
    - filteredMenu를 통해서 필터링된 것을 기반으로 렌더링할 MealItem 컴포넌트 배열 생성
- 조건부 렌더링
    - mealList에 값이 없을 때는 값이 없다고 출력


---

### MenuSearch 컴포넌트

- useContext(MenuContext)를 통해서 MenuProvider에서 제공하는 handleSearch 함수를 가져온다.
- autoCompleteResults
    - 자동 완성 값의 상태, 상태관리
- handleChange(e) 함수
    - 검색 입력 값에 대한 처리
        - input에서 사용자가 입력하는 것을 searchValue에 담고, 이를 useContext(MenuContext)를 통해 얻어온 handleSearch 함수에 넘긴다.
        - 이를 통해 MenuProvider에서 전역으로 menuSearch에 대한 값이 관리가 되며, 이는 AvailableMenu.js에서 반영이 되어 해당 값에 맞게 렌더링 되는 것이다.
    - 자동 완성
        - autoCompleteValue에 사용자가 input에 입력하는 값을 담고, 이를 props로 받아온 meals에 필터링하여 setAutoCompleteResults로 상태 업데이트한다.
        - 이는 해당 컴포넌트에서 바로 사용하므로 전역 관리가 필요없다고 판단하여 사용하지 않았따.
- handleAutoCompleteSelection 함수
    - onClick 시 실행하는 함수로 입력 값에 따라 보이는  autoCompleteValue를 클릭하면 아까 context를 통해 얻어온 handleSearch()함수에 해당 값을 보내어 해당 메뉴를 렌더링한다.

