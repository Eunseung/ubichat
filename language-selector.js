(function () {
  'use strict';

  const storageKey = 'unichat.ui.language';
  const languages = [
    { code: 'ko', label: 'KO', name: 'Korean' },
    { code: 'id', label: 'ID', name: 'Bahasa Indonesia' },
    { code: 'en', label: 'EN', name: 'English' },
    { code: 'ru', label: 'RU', name: 'Russian' },
    { code: 'ky', label: 'KY', name: 'Kyrgyz' },
    { code: 'tg', label: 'TG', name: 'Tajik' }
  ];

  const translations = {
    id: {
      '대학 탐색': 'Jelajahi universitas', '상담하기': 'Mulai konsultasi', '내 상담': 'Konsultasi saya', '콘텐츠': 'Panduan',
      '대학 서비스': 'Layanan universitas', '로그인': 'Masuk', '로그아웃': 'Keluar', '공지사항': 'Pengumuman', '문서 보관함': 'Penyimpanan dokumen', '마이페이지': 'Halaman saya',
      '나에게 맞는 한국 전문대학을': 'Temukan perguruan tinggi vokasi Korea', '탐색해 보세요': 'yang tepat untuk Anda',
      '관심 분야를 둘러보고, 궁금한 대학에 바로 상담을 신청하세요.': 'Jelajahi bidang minat dan ajukan konsultasi langsung ke universitas yang ingin Anda ketahui.',
      '지금 상담 가능한 전문대학': 'Perguruan tinggi vokasi yang dapat dikonsultasikan sekarang', '전체 둘러보기': 'Lihat semua', '대학 소개 보기': 'Lihat profil universitas',
      '전체 대학 탐색': 'Jelajahi semua universitas', '한국 생활 준비 혜택': 'Manfaat untuk persiapan hidup di Korea',
      '유학 준비에 필요한 정보를': 'Informasi yang Anda perlukan untuk studi di Korea', '한곳에서 확인하세요': 'tersedia di satu tempat',
      '새 콘텐츠를 준비하고 있습니다': 'Konten baru sedang disiapkan', '대학 탐색하기': 'Jelajahi universitas',
      '학생 로그인': 'Masuk siswa', '학생 회원가입': 'Daftar sebagai siswa', '이메일': 'Email', '비밀번호': 'Kata sandi',
      '국가': 'Negara', '도시': 'Kota', '고등학교': 'Sekolah menengah atas', '이름': 'Nama', '언어': 'Bahasa',
      '상담 상태': 'Status konsultasi', '운영 시간': 'Jam layanan', '상담 언어': 'Bahasa konsultasi',
      '대학에 바로 물어보세요': 'Tanyakan langsung ke universitas', '학생 로그인 후 상담하기': 'Masuk sebagai siswa untuk berkonsultasi',
      '대학 소개': 'Profil universitas', '외국인 유학생 모집 안내': 'Informasi penerimaan mahasiswa internasional',
      '내 상담': 'Konsultasi saya', '대학별 대화는 하나의 채널로 계속 이어져요': 'Percakapan dengan setiap universitas berlanjut dalam satu kanal.',
      '대기': 'Menunggu', '진행중': 'Berlangsung', '종료': 'Selesai', '설정': 'Pengaturan',
      '이메일 알림': 'Notifikasi email', '시간대': 'Zona waktu', '계정 탈퇴': 'Hapus akun', '한국어': 'Bahasa Korea',
      '언어 선택': 'Pilih bahasa', 'ubichat | 콘텐츠': 'ubichat | Panduan', 'ubichat | 대학 탐색': 'ubichat | Jelajahi universitas'
    },
    en: {
      '대학 탐색': 'Explore universities', '상담하기': 'Start a consultation', '내 상담': 'My consultations', '콘텐츠': 'Guides',
      '대학 서비스': 'University service', '로그인': 'Sign in', '로그아웃': 'Sign out', '공지사항': 'Notices', '문서 보관함': 'Document library', '마이페이지': 'My page',
      '나에게 맞는 한국 전문대학을': 'Find a Korean vocational college', '탐색해 보세요': 'that is right for you',
      '관심 분야를 둘러보고, 궁금한 대학에 바로 상담을 신청하세요.': 'Explore your interests and request a consultation with a university right away.',
      '지금 상담 가능한 전문대학': 'Vocational colleges available for consultation', '전체 둘러보기': 'Explore all', '대학 소개 보기': 'View university profile',
      '전체 대학 탐색': 'Explore all universities', '한국 생활 준비 혜택': 'Prepare for life in Korea',
      '유학 준비에 필요한 정보를': 'Everything you need for studying in Korea', '한곳에서 확인하세요': 'in one place',
      '새 콘텐츠를 준비하고 있습니다': 'New guides are on the way', '대학 탐색하기': 'Explore universities',
      '학생 로그인': 'Student sign in', '학생 회원가입': 'Student sign up', '이메일': 'Email', '비밀번호': 'Password',
      '국가': 'Country', '도시': 'City', '고등학교': 'High school', '이름': 'Name', '언어': 'Language',
      '상담 상태': 'Consultation status', '운영 시간': 'Office hours', '상담 언어': 'Consultation languages',
      '대학에 바로 물어보세요': 'Ask the university directly', '학생 로그인 후 상담하기': 'Sign in as a student to consult',
      '대학 소개': 'University profile', '외국인 유학생 모집 안내': 'International student admissions',
      '대학별 대화는 하나의 채널로 계속 이어져요': 'Each university conversation continues in one channel.',
      '대기': 'Waiting', '진행중': 'In progress', '종료': 'Closed', '설정': 'Settings',
      '이메일 알림': 'Email notifications', '시간대': 'Time zone', '계정 탈퇴': 'Delete account', '한국어': 'Korean',
      '언어 선택': 'Select language', 'ubichat | 콘텐츠': 'ubichat | Guides', 'ubichat | 대학 탐색': 'ubichat | Explore universities'
    },
    ru: {
      '대학 탐색': 'Поиск университетов', '상담하기': 'Начать консультацию', '내 상담': 'Мои консультации', '콘텐츠': 'Материалы',
      '대학 서비스': 'Сервис университета', '로그인': 'Войти', '로그아웃': 'Выйти', '공지사항': 'Объявления', '문서 보관함': 'Хранилище документов', '마이페이지': 'Моя страница',
      '나에게 맞는 한국 전문대학을': 'Найдите подходящий корейский колледж', '탐색해 보세요': 'для себя',
      '관심 분야를 둘러보고, 궁금한 대학에 바로 상담을 신청하세요.': 'Изучите интересующие направления и сразу запросите консультацию в университете.',
      '지금 상담 가능한 전문대학': 'Колледжи, доступные для консультации', '전체 둘러보기': 'Посмотреть все', '대학 소개 보기': 'Профиль университета',
      '전체 대학 탐색': 'Все университеты', '한국 생활 준비 혜택': 'Подготовка к жизни в Корее',
      '유학 준비에 필요한 정보를': 'Всё необходимое для учёбы в Корее', '한곳에서 확인하세요': 'в одном месте',
      '새 콘텐츠를 준비하고 있습니다': 'Новые материалы готовятся', '대학 탐색하기': 'Найти университет',
      '학생 로그인': 'Вход для студентов', '학생 회원가입': 'Регистрация студента', '이메일': 'Эл. почта', '비밀번호': 'Пароль',
      '국가': 'Страна', '도시': 'Город', '고등학교': 'Старшая школа', '이름': 'Имя', '언어': 'Язык',
      '상담 상태': 'Статус консультации', '운영 시간': 'Часы работы', '상담 언어': 'Языки консультации',
      '대학에 바로 물어보세요': 'Спросите университет напрямую', '학생 로그인 후 상담하기': 'Войдите как студент для консультации',
      '대학 소개': 'Об университете', '외국인 유학생 모집 안내': 'Приём иностранных студентов',
      '대학별 대화는 하나의 채널로 계속 이어져요': 'Диалог с каждым университетом продолжается в одном канале.',
      '대기': 'Ожидание', '진행중': 'В процессе', '종료': 'Завершено', '설정': 'Настройки',
      '이메일 알림': 'Уведомления по почте', '시간대': 'Часовой пояс', '계정 탈퇴': 'Удалить аккаунт', '한국어': 'Корейский',
      '언어 선택': 'Выберите язык', 'ubichat | 콘텐츠': 'ubichat | Материалы', 'ubichat | 대학 탐색': 'ubichat | Поиск университетов'
    },
    ky: {
      '대학 탐색': 'Университеттерди издөө', '상담하기': 'Кеңеш алуу', '내 상담': 'Менин кеңештерим', '콘텐츠': 'Материалдар',
      '대학 서비스': 'Университет кызматы', '로그인': 'Кирүү', '로그아웃': 'Чыгуу', '공지사항': 'Кулактандыруулар', '문서 보관함': 'Документтер сактагычы', '마이페이지': 'Менин барагым',
      '나에게 맞는 한국 전문대학을': 'Өзүңүзгө ылайык кореялык колледжди', '탐색해 보세요': 'табыңыз',
      '관심 분야를 둘러보고, 궁금한 대학에 바로 상담을 신청하세요.': 'Кызыккан багыттарды карап, университетке дароо кеңеш алууга кайрылыңыз.',
      '지금 상담 가능한 전문대학': 'Азыр кеңеш алууга мүмкүн болгон колледждер', '전체 둘러보기': 'Баарын көрүү', '대학 소개 보기': 'Университет профилин көрүү',
      '전체 대학 탐색': 'Бардык университеттерди көрүү', '한국 생활 준비 혜택': 'Кореядагы жашоого даярдык',
      '유학 준비에 필요한 정보를': 'Кореяда окууга керектүү маалыматты', '한곳에서 확인하세요': 'бир жерден табыңыз',
      '새 콘텐츠를 준비하고 있습니다': 'Жаңы материалдар даярдалууда', '대학 탐색하기': 'Университет издөө',
      '학생 로그인': 'Студент кирүүсү', '학생 회원가입': 'Студент каттоосу', '이메일': 'Эл. почта', '비밀번호': 'Сырсөз',
      '국가': 'Өлкө', '도시': 'Шаар', '고등학교': 'Жогорку мектеп', '이름': 'Аты-жөнү', '언어': 'Тил',
      '상담 상태': 'Кеңеш абалы', '운영 시간': 'Иштөө убактысы', '상담 언어': 'Кеңеш тилдери',
      '대학에 바로 물어보세요': 'Университеттен түз сураңыз', '학생 로그인 후 상담하기': 'Кеңеш алуу үчүн студент катары кириңиз',
      '대학 소개': 'Университет жөнүндө', '외국인 유학생 모집 안내': 'Эл аралык студенттерди кабыл алуу',
      '대학별 대화는 하나의 채널로 계속 이어져요': 'Ар бир университет менен сүйлөшүү бир каналда уланат.',
      '대기': 'Күтүүдө', '진행중': 'Уланууда', '종료': 'Аяктады', '설정': 'Жөндөөлөр',
      '이메일 알림': 'Эл. почта эскертмелери', '시간대': 'Убакыт алкагы', '계정 탈퇴': 'Каттоо эсебин өчүрүү', '한국어': 'Корей тили',
      '언어 선택': 'Тилди тандаңыз', 'ubichat | 콘텐츠': 'ubichat | Материалдар', 'ubichat | 대학 탐색': 'ubichat | Университеттерди издөө'
    },
    tg: {
      '대학 탐색': 'Ҷустуҷӯи донишгоҳҳо', '상담하기': 'Оғози машварат', '내 상담': 'Машваратҳои ман', '콘텐츠': 'Маводҳо',
      '대학 서비스': 'Хидмати донишгоҳ', '로그인': 'Ворид шудан', '로그아웃': 'Баромадан', '공지사항': 'Эълонҳо', '문서 보관함': 'Бойгонии ҳуҷҷатҳо', '마이페이지': 'Саҳифаи ман',
      '나에게 맞는 한국 전문대학을': 'Коллеҷи касбии Кореяи ба шумо мувофиқро', '탐색해 보세요': 'пайдо кунед',
      '관심 분야를 둘러보고, 궁금한 대학에 바로 상담을 신청하세요.': 'Самтҳои шавқмандро бинед ва фавран барои машварат ба донишгоҳ муроҷиат кунед.',
      '지금 상담 가능한 전문대학': 'Коллеҷҳои дастрас барои машварат', '전체 둘러보기': 'Дидани ҳама', '대학 소개 보기': 'Дидани профили донишгоҳ',
      '전체 대학 탐색': 'Ҳамаи донишгоҳҳоро бинед', '한국 생활 준비 혜택': 'Омодагӣ ба зиндагӣ дар Корея',
      '유학 준비에 필요한 정보를': 'Маълумоти зарурӣ барои таҳсил дар Кореяро', '한곳에서 확인하세요': 'дар як ҷо бинед',
      '새 콘텐츠를 준비하고 있습니다': 'Маводҳои нав омода мешаванд', '대학 탐색하기': 'Ҷустуҷӯи донишгоҳ',
      '학생 로그인': 'Воридшавии донишҷӯ', '학생 회원가입': 'Сабти номи донишҷӯ', '이메일': 'Почтаи электронӣ', '비밀번호': 'Гузарвожа',
      '국가': 'Кишвар', '도시': 'Шаҳр', '고등학교': 'Мактаби миёна', '이름': 'Ном', '언어': 'Забон',
      '상담 상태': 'Ҳолати машварат', '운영 시간': 'Соатҳои корӣ', '상담 언어': 'Забонҳои машварат',
      '대학에 바로 물어보세요': 'Аз донишгоҳ мустақим пурсед', '학생 로그인 후 상담하기': 'Барои машварат ҳамчун донишҷӯ ворид шавед',
      '대학 소개': 'Дар бораи донишгоҳ', '외국인 유학생 모집 안내': 'Қабули донишҷӯёни хориҷӣ',
      '대학별 대화는 하나의 채널로 계속 이어져요': 'Муколама бо ҳар донишгоҳ дар як канал идома меёбад.',
      '대기': 'Дар интизорӣ', '진행중': 'Дар ҷараён', '종료': 'Анҷом ёфт', '설정': 'Танзимот',
      '이메일 알림': 'Огоҳиҳои почтаи электронӣ', '시간대': 'Минтақаи вақт', '계정 탈퇴': 'Ҳазфи ҳисоб', '한국어': 'Забони кореягӣ',
      '언어 선택': 'Интихоби забон', 'ubichat | 콘텐츠': 'ubichat | Маводҳо', 'ubichat | 대학 탐색': 'ubichat | Ҷустуҷӯи донишгоҳҳо'
    }
  };

  const supplementalTranslations = {
    id: {
      '요양보호': 'Perawatan lansia', '육성형 전문기술': 'Keterampilan teknis unggulan', '뿌리산업': 'Industri dasar', '기타': 'Lainnya',
      '대학의 응답 정보와 특화 분야를 확인하고, 나에게 맞는 학교를 둘러보세요.': 'Periksa informasi respons dan bidang unggulan setiap universitas untuk menemukan yang tepat bagi Anda.',
      '보통 1시간 내 응답': 'Biasanya merespons dalam 1 jam', '보통 3시간 내 응답': 'Biasanya merespons dalam 3 jam', '보통 1일 내 응답': 'Biasanya merespons dalam 1 hari',
      'TOPIK 시작하기': 'Mulai TOPIK', '대학 담당자이신가요?': 'Apakah Anda staf universitas?', '우리 대학을 학생에게 소개해 보세요': 'Perkenalkan universitas Anda kepada calon mahasiswa', '대학 등록 신청': 'Daftarkan universitas',
      '개인정보 처리방침': 'Kebijakan Privasi', '서비스 이용약관': 'Syarat dan Ketentuan Layanan',
      '대학 선택부터 한국 생활 준비까지, 검토를 마친 콘텐츠를 차례로 소개합니다.': 'Dari memilih universitas hingga mempersiapkan hidup di Korea, kami akan memperkenalkan panduan yang telah ditinjau.',
      '게시가 완료된 콘텐츠만 이곳에 표시됩니다. 먼저 관심 있는 대학을 탐색해 보세요.': 'Hanya panduan yang telah diterbitkan yang ditampilkan di sini. Mulailah dengan menjelajahi universitas yang diminati.'
    },
    en: {
      '요양보호': 'Caregiving', '육성형 전문기술': 'Advanced technical skills', '뿌리산업': 'Root industries', '기타': 'Other',
      '대학의 응답 정보와 특화 분야를 확인하고, 나에게 맞는 학교를 둘러보세요.': 'Review each university’s response information and specialist fields to find the right fit.',
      '보통 1시간 내 응답': 'Usually replies within 1 hour', '보통 3시간 내 응답': 'Usually replies within 3 hours', '보통 1일 내 응답': 'Usually replies within 1 day',
      'TOPIK 시작하기': 'Start TOPIK', '대학 담당자이신가요?': 'Are you a university representative?', '우리 대학을 학생에게 소개해 보세요': 'Introduce your university to students', '대학 등록 신청': 'Register your university',
      '개인정보 처리방침': 'Privacy Policy', '서비스 이용약관': 'Terms of Service',
      '대학 선택부터 한국 생활 준비까지, 검토를 마친 콘텐츠를 차례로 소개합니다.': 'From choosing a university to preparing for life in Korea, discover reviewed guides in one place.',
      '게시가 완료된 콘텐츠만 이곳에 표시됩니다. 먼저 관심 있는 대학을 탐색해 보세요.': 'Only published guides appear here. Start by exploring universities that interest you.'
    },
    ru: {
      '요양보호': 'Уход', '육성형 전문기술': 'Передовые технические навыки', '뿌리산업': 'Базовые отрасли', '기타': 'Другое',
      '대학의 응답 정보와 특화 분야를 확인하고, 나에게 맞는 학교를 둘러보세요.': 'Сравните информацию об ответах и профильных направлениях университетов, чтобы найти подходящий.',
      '보통 1시간 내 응답': 'Обычно отвечает в течение 1 часа', '보통 3시간 내 응답': 'Обычно отвечает в течение 3 часов', '보통 1일 내 응답': 'Обычно отвечает в течение 1 дня',
      'TOPIK 시작하기': 'Начать TOPIK', '대학 담당자이신가요?': 'Вы представитель университета?', '우리 대학을 학생에게 소개해 보세요': 'Расскажите студентам о своём университете', '대학 등록 신청': 'Зарегистрировать университет',
      '개인정보 처리방침': 'Политика конфиденциальности', '서비스 이용약관': 'Условия использования',
      '대학 선택부터 한국 생활 준비까지, 검토를 마친 콘텐츠를 차례로 소개합니다.': 'От выбора университета до подготовки к жизни в Корее — здесь собраны проверенные материалы.',
      '게시가 완료된 콘텐츠만 이곳에 표시됩니다. 먼저 관심 있는 대학을 탐색해 보세요.': 'Здесь отображаются только опубликованные материалы. Начните с поиска интересующих университетов.'
    },
    ky: {
      '요양보호': 'Кам көрүү', '육성형 전문기술': 'Алдыңкы техникалык көндүмдөр', '뿌리산업': 'Негизги тармактар', '기타': 'Башка',
      '대학의 응답 정보와 특화 분야를 확인하고, 나에게 맞는 학교를 둘러보세요.': 'Сизге ылайык университетти табуу үчүн жооп маалыматын жана адистешкен багыттарын салыштырыңыз.',
      '보통 1시간 내 응답': 'Адатта 1 саатта жооп берет', '보통 3시간 내 응답': 'Адатта 3 саатта жооп берет', '보통 1일 내 응답': 'Адатта 1 күндө жооп берет',
      'TOPIK 시작하기': 'TOPIK баштоо', '대학 담당자이신가요?': 'Сиз университеттин өкүлүсүзбү?', '우리 대학을 학생에게 소개해 보세요': 'Университетиңизди студенттерге тааныштырыңыз', '대학 등록 신청': 'Университетти каттоо',
      '개인정보 처리방침': 'Купуялык саясаты', '서비스 이용약관': 'Тейлөө шарттары',
      '대학 선택부터 한국 생활 준비까지, 검토를 마친 콘텐츠를 차례로 소개합니다.': 'Университет тандоодон тартып Кореядагы жашоого даярдыкка чейин текшерилген материалдарды табыңыз.',
      '게시가 완료된 콘텐츠만 이곳에 표시됩니다. 먼저 관심 있는 대학을 탐색해 보세요.': 'Бул жерде жарыяланган материалдар гана көрсөтүлөт. Адегенде кызыккан университеттерди издеңиз.'
    },
    tg: {
      '요양보호': 'Нигоҳубин', '육성형 전문기술': 'Малакаҳои пешрафтаи техникӣ', '뿌리산업': 'Саноатҳои асосӣ', '기타': 'Дигар',
      '대학의 응답 정보와 특화 분야를 확인하고, 나에게 맞는 학교를 둘러보세요.': 'Маълумоти посух ва самтҳои тахассусии донишгоҳҳоро муқоиса кунед, то донишгоҳи мувофиқро ёбед.',
      '보통 1시간 내 응답': 'Одатан дар 1 соат ҷавоб медиҳад', '보통 3시간 내 응답': 'Одатан дар 3 соат ҷавоб медиҳад', '보통 1일 내 응답': 'Одатан дар 1 рӯз ҷавоб медиҳад',
      'TOPIK 시작하기': 'Оғози TOPIK', '대학 담당자이신가요?': 'Шумо намояндаи донишгоҳ ҳастед?', '우리 대학을 학생에게 소개해 보세요': 'Донишгоҳи худро ба донишҷӯён муаррифӣ кунед', '대학 등록 신청': 'Сабти донишгоҳ',
      '개인정보 처리방침': 'Сиёсати махфият', '서비스 이용약관': 'Шартҳои истифодаи хизматрасонӣ',
      '대학 선택부터 한국 생활 준비까지, 검토를 마친 콘텐츠를 차례로 소개합니다.': 'Аз интихоби донишгоҳ то омодагӣ ба зиндагӣ дар Корея, маводҳои санҷидашударо дар як ҷо бинед.',
      '게시가 완료된 콘텐츠만 이곳에 표시됩니다. 먼저 관심 있는 대학을 탐색해 보세요.': 'Дар ин ҷо танҳо маводҳои нашршуда нишон дода мешаванд. Аввал донишгоҳҳои мавриди таваҷҷуҳро ҷустуҷӯ кунед.'
    }
  };
  Object.keys(supplementalTranslations).forEach((language) => Object.assign(translations[language], supplementalTranslations[language]));

  const originalText = new WeakMap();
  const originalAttributes = new WeakMap();
  let activeLanguage = 'ko';

  function storage() {
    try { return window.localStorage; } catch (error) { return null; }
  }

  function translate(source, language = activeLanguage) {
    return translations[language]?.[source] || source;
  }

  function rewriteTextNode(node) {
    const source = originalText.get(node) ?? node.nodeValue;
    if (!originalText.has(node)) originalText.set(node, source);
    const leading = source.match(/^\s*/)?.[0] || '';
    const trailing = source.match(/\s*$/)?.[0] || '';
    const value = source.trim();
    const translated = translate(value);
    const next = value && translated !== value ? `${leading}${translated}${trailing}` : source;
    if (node.nodeValue !== next) node.nodeValue = next;
  }

  function rewriteAttributes(element) {
    const attributes = ['placeholder', 'aria-label', 'title', 'alt'];
    let originals = originalAttributes.get(element);
    if (!originals) {
      originals = {};
      originalAttributes.set(element, originals);
    }
    attributes.forEach((name) => {
      if (!element.hasAttribute(name)) return;
      if (!(name in originals)) originals[name] = element.getAttribute(name);
      const source = originals[name];
      const translated = translate(source);
      if (translated !== source) element.setAttribute(name, translated);
      else if (element.getAttribute(name) !== source) element.setAttribute(name, source);
    });
  }

  function translateTree(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      rewriteTextNode(node);
      return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE && node.nodeType !== Node.DOCUMENT_NODE) return;
    if (node.nodeType === Node.ELEMENT_NODE) {
      if (node.matches('script, style, option, [data-i18n-no-translate]')) return;
      rewriteAttributes(node);
    }
    node.childNodes.forEach(translateTree);
  }

  function applyLanguage(language) {
    activeLanguage = languages.some((item) => item.code === language) ? language : 'ko';
    const originalTitle = document.documentElement.dataset.i18nOriginalTitle || document.title;
    document.documentElement.dataset.i18nOriginalTitle = originalTitle;
    document.documentElement.lang = activeLanguage;
    document.querySelectorAll('[data-language-selector]').forEach((selector) => {
      const selected = languages.find((item) => item.code === activeLanguage) || languages[0];
      const trigger = selector.querySelector('[data-language-selector-trigger]');
      selector.querySelectorAll('[role="option"]').forEach((option) => {
        const isSelected = option.dataset.languageCode === selected.code;
        option.setAttribute('aria-selected', String(isSelected));
      });
      if (trigger) {
        trigger.textContent = selected.label;
        trigger.setAttribute('aria-expanded', 'false');
      }
      selector.querySelector('[data-language-selector-options]')?.setAttribute('hidden', '');
    });
    translateTree(document);
    document.title = translate(originalTitle);
    try { storage()?.setItem(storageKey, activeLanguage); } catch (error) { /* storage may be unavailable */ }
    window.dispatchEvent(new CustomEvent('unichat:language-changed', { detail: { language: activeLanguage } }));
  }

  function closeSelector(selector) {
    const trigger = selector.querySelector('[data-language-selector-trigger]');
    const options = selector.querySelector('[data-language-selector-options]');
    trigger?.setAttribute('aria-expanded', 'false');
    options?.setAttribute('hidden', '');
  }

  function createSelector(placement = '') {
    const wrapper = document.createElement('div');
    wrapper.className = 'language-selector';
    wrapper.setAttribute('data-language-selector', '');
    if (placement) wrapper.dataset.languageSelectorPlacement = placement;
    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'language-selector-trigger';
    trigger.setAttribute('data-language-selector-trigger', '');
    trigger.setAttribute('aria-label', '언어 선택');
    trigger.setAttribute('aria-haspopup', 'listbox');
    trigger.setAttribute('aria-expanded', 'false');

    const options = document.createElement('div');
    options.className = 'language-selector-options';
    options.setAttribute('data-language-selector-options', '');
    options.setAttribute('role', 'listbox');
    options.setAttribute('aria-label', '언어 선택');
    options.hidden = true;

    languages.forEach(({ code, label, name }) => {
      const option = document.createElement('button');
      option.type = 'button';
      option.className = 'language-selector-option';
      option.dataset.languageCode = code;
      option.setAttribute('role', 'option');
      option.setAttribute('aria-selected', 'false');
      option.textContent = `${name} (${label})`;
      option.lang = code;
      option.addEventListener('click', () => {
        applyLanguage(code);
        closeSelector(wrapper);
        trigger.focus();
      });
      options.appendChild(option);
    });

    trigger.addEventListener('click', () => {
      const willOpen = options.hidden;
      document.querySelectorAll('[data-language-selector]').forEach(closeSelector);
      if (willOpen) {
        options.hidden = false;
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
    wrapper.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeSelector(wrapper);
        trigger.focus();
      }
    });
    wrapper.append(trigger, options);
    return wrapper;
  }

  function mountSelectors() {
    document.querySelectorAll('[data-language-select-host]').forEach((host) => {
      if (!host.querySelector('[data-language-selector]')) host.appendChild(createSelector());
    });
    document.querySelectorAll('[data-public-header]').forEach((header) => {
      const nav = header.querySelector('.header-nav, .student-header-nav');
      const actions = header.querySelector('.header-actions, .student-header-actions');
      if (nav && !nav.querySelector('[data-language-selector-placement="mobile"]')) {
        nav.appendChild(createSelector('mobile'));
      }
      if (actions && !actions.querySelector('[data-language-selector-placement="desktop"]')) {
        const desktopSelector = createSelector('desktop');
        const login = actions.querySelector('[data-student-login]');
        if (login) login.insertAdjacentElement('afterend', desktopSelector);
        else actions.prepend(desktopSelector);
      }
    });
  }

  function mountStudentSelectorStyles() {
    if (!document.querySelector('.student-header-nav') || document.querySelector('#unichat-language-selector-styles')) return;
    const style = document.createElement('style');
    style.id = 'unichat-language-selector-styles';
    style.textContent = `
      .student-header-nav .language-selector,.student-header-actions .language-selector{position:relative;display:inline-flex;align-items:center;margin-left:5px}
      .student-header-nav .language-selector-trigger,.student-header-actions .language-selector-trigger{position:relative;min-width:64px;min-height:34px;padding:0 25px 0 12px;border:1px solid #d7e0ee;border-radius:999px;background:#fff;color:#475467;font:750 12px var(--sans);line-height:1;text-align:left;cursor:pointer}
      .student-header-nav .language-selector-trigger::after,.student-header-actions .language-selector-trigger::after{content:"⌄";position:absolute;top:50%;right:10px;transform:translateY(-53%);color:#667085;font-size:13px;font-weight:800}
      .student-header-nav .language-selector-options,.student-header-actions .language-selector-options{position:absolute;z-index:35;top:calc(100% + 7px);right:0;min-width:184px;padding:5px;border:1px solid #d7e0ee;border-radius:12px;background:#fff;box-shadow:0 16px 32px rgba(16,34,63,.16)}
      .student-header-nav .language-selector-options[hidden],.student-header-actions .language-selector-options[hidden]{display:none}
      .student-header-nav .language-selector-option,.student-header-actions .language-selector-option{display:block;width:100%;min-height:33px;padding:0 9px;border:0;border-radius:8px;background:transparent;color:#475467;font:700 12px var(--sans);text-align:left;white-space:nowrap;cursor:pointer}
      .student-header-nav .language-selector-option:hover,.student-header-nav .language-selector-option[aria-selected="true"],.student-header-actions .language-selector-option:hover,.student-header-actions .language-selector-option[aria-selected="true"]{background:#eef3ff;color:#1d4ed8}
      .student-header-nav .language-selector-trigger:focus-visible,.student-header-nav .language-selector-option:focus-visible,.student-header-actions .language-selector-trigger:focus-visible,.student-header-actions .language-selector-option:focus-visible{outline:3px solid rgba(37,99,235,.26);outline-offset:2px}
      .student-header-nav > .language-selector[data-language-selector-placement="mobile"]{display:none}
      .student-header-actions > .language-selector[data-language-selector-placement="desktop"]{margin-left:0}
      @media(max-width:760px){.student-header-actions > .language-selector[data-language-selector-placement="desktop"]{display:none}.student-public-header.is-mobile-menu-open .student-header-nav > .language-selector[data-language-selector-placement="mobile"]{display:inline-flex}.student-public-header.is-mobile-menu-open .language-selector{display:block}.student-public-header.is-mobile-menu-open .language-selector-trigger{width:100%}.student-public-header.is-mobile-menu-open .language-selector-options{right:4px;left:4px;min-width:0}}
    `;
    document.head.appendChild(style);
  }

  function initialLanguage() {
    try {
      const saved = storage()?.getItem(storageKey);
      if (languages.some((item) => item.code === saved)) return saved;
    } catch (error) { /* storage may be unavailable */ }
    return 'ko';
  }

  mountStudentSelectorStyles();
  mountSelectors();
  applyLanguage(initialLanguage());
  document.addEventListener('click', (event) => {
    if (!event.target.closest('[data-language-selector]')) {
      document.querySelectorAll('[data-language-selector]').forEach(closeSelector);
    }
  });
  const observer = new MutationObserver((records) => {
    records.forEach((record) => {
      record.addedNodes.forEach(translateTree);
      if (record.type === 'characterData') rewriteTextNode(record.target);
    });
  });
  observer.observe(document.body, { childList: true, characterData: true, subtree: true });

  window.UniChatI18n = { applyLanguage, languages, translate, getLanguage: () => activeLanguage };
}());
