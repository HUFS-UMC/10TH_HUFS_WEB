# 10TH_HUFS_WEB
UMC 10기 한국외대 Web 레포지토리
## 1.1. 깃허브 업로드 방법
### 1. GitHub 웹사이트에서 직접 업로드
복잡한 명령어 없이 브라우저에서 바로 파일을 올리는 방법은 다음과 같다.
1. 브랜치 선택: 해당 저장소 링크에 접속한 후, 왼쪽 상단의 브랜치 버튼이 Week01_Kite로 되어 있는지 확인합니다.   
2. 파일 업로드 메뉴: 우측 상단의 [Add file] 버튼을 누르고 [Upload files]를 클릭합니다.   
3. 파일 드래그: 내 컴퓨터에서 업로드할 파일이나 폴더를 브라우저 화면으로 끌어다 놓습니다. (폴더 업로드 가능)   
4. 커밋(저장): 하단의 'Commit changes' 박스에 작업 내용을 간단히 적고, [Commit changes] 버튼을 눌러 완료합니다.
### 2. Git 터미널(CLI)을 이용한 업로드 (개발자 방식)
내 컴퓨터의 로컬 저장소와 연결하여 명령어로 업로드하는 방법입니다. 
1.  로컬 저장소 설정: 업로드할 폴더에서 터미널을 열고 Git을 초기화합니다. (이미 설정한 경우 넘어가도 된다.)
```bash
git init
git remote add origin https://github.com
```
2. 해당 브랜치로 이동:
- 브런치 명을 반드시 확인하세요. (origin/Week01_Kite)
```bash
git fetch origin
git checkout -b Week01_Kite origin/Week01_Kite
# 만약 브랜치가 이미 있다면: git checkout Week01_Kite
```
3. 파일 추가 및 커밋:
  ```bash
  git add .
  git commit -m "Week01 과제 제출"
  ```
4. 푸시(업로드):
```bash
  git push origin Week01_Kite
```
