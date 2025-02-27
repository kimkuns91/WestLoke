# WestLoke Amps

WestLoke Amps는 워싱턴 주 보첼에 위치한 수제 기타 앰프 제작 회사입니다. 최고급 진공관 앰프를 제작하여 진정한 톤을 추구하는 기타리스트들에게 제공합니다.

## 기술 스택

### Frontend
- Next.js 15 (App Router)
- React 19
- TypeScript
- TailwindCSS
- ShadcN UI
- Next-Auth v5 (Beta)
- React Query
- Framer Motion

### Backend
- Next.js Server Actions
- Prisma ORM
- MongoDB
- NodeMailer

### 다국어 지원
- next-intl
- 한국어/영어 지원

### 개발 도구
- ESLint
- Prettier
- TypeScript
- Tailwind CSS Plugin

## 주요 기능

- 📱 반응형 디자인
- 🔐 소셜 로그인 (Google)
- 📧 이메일 로그인
- 🌏 다국어 지원 (한국어/영어)
- 📬 문의하기 시스템
- 📮 뉴스레터 구독
- 👤 사용자 프로필 관리
- 🎨 모던한 UI/UX

## 시작하기

1. 저장소 클론:
```bash
git clone https://github.com/kimkuns91/WestLoke
```

2. 의존성 설치:
```bash
yarn install
```

3. 환경 변수 설정:
```bash
cp .env.example .env.local
```

4. 개발 서버 실행:
```bash
yarn dev
```

5. http://localhost:3000 접속

## 환경 변수

```env
DATABASE_URL=your_mongodb_url
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
EMAIL_USER=your_email
EMAIL_APP_PASSWORD=your_email_app_password
```

## 프로젝트 구조

```
westloke-amps/
├── app/                    # Next.js App Router 페이지
├── components/            # React 컴포넌트
├── actions/              # Server Actions
├── hooks/               # Custom Hooks
├── lib/                # 유틸리티 함수
├── types/             # TypeScript 타입 정의
├── prisma/           # Prisma 스키마 및 설정
└── public/          # 정적 파일
```

## 배포

이 프로젝트는 Vercel에 배포됩니다. main 브랜치에 push하면 자동으로 배포가 진행됩니다.

## 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.
