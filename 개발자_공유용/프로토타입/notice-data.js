(function(){
  const STORAGE_KEY='unichat.prototype.platform-notices.v1';
  const AUDIENCES=new Set(['all','student','university']);
  const STATUSES=new Set(['draft','published','hidden']);
  const seedNotices=[
    {
      id:'notice-service-hours',
      title:'서비스 운영시간 점검 안내',
      summary:'7월 31일 새벽에 짧은 서비스 점검이 진행됩니다.',
      body:'안정적인 상담 서비스 제공을 위해 7월 31일 02:00부터 03:00까지 점검을 진행합니다. 점검 중에는 메시지와 문서 전송이 잠시 지연될 수 있습니다.',
      audience:'all',
      status:'published',
      important:true,
      author:'플랫폼 운영팀',
      publishedAt:'2026-07-29T09:00:00+09:00',
      updatedAt:'2026-07-29T09:00:00+09:00'
    },
    {
      id:'notice-student-documents',
      title:'학생 문서 업로드 기준 안내',
      summary:'입학 서류는 PDF, 파일당 10MB 이하로 준비해 주세요.',
      body:'문서 보관함과 대학의 서류 요청에서 업로드하는 파일은 PDF 형식, 파일당 10MB 이하로 준비해 주세요. 대학에 전송하기 전 대상 대학과 소속구분을 다시 확인할 수 있습니다.',
      audience:'student',
      status:'published',
      important:false,
      author:'플랫폼 운영팀',
      publishedAt:'2026-07-28T14:20:00+09:00',
      updatedAt:'2026-07-28T14:20:00+09:00'
    },
    {
      id:'notice-university-operation',
      title:'대학 상담 운영 정책 업데이트',
      summary:'소속구분별 상담과 문서 재요청 흐름이 업데이트되었습니다.',
      body:'대학 구성원은 배정된 소속구분 상담을 처리합니다. 이미 받은 문서에 보완이 필요하면 재요청하기를 사용하고, 학생이 다시 전송하면 우측 문서 패널의 업데이트 알림을 확인해 주세요.',
      audience:'university',
      status:'published',
      important:false,
      author:'플랫폼 운영팀',
      publishedAt:'2026-07-27T11:40:00+09:00',
      updatedAt:'2026-07-27T11:40:00+09:00'
    },
    {
      id:'notice-august-preview',
      title:'8월 기능 업데이트 안내',
      summary:'학생·대학 포털 개선 사항을 정리하고 있습니다.',
      body:'8월 기능 업데이트의 상세 내용과 적용 일시는 준비가 끝난 뒤 게시합니다.',
      audience:'all',
      status:'draft',
      important:false,
      author:'플랫폼 운영팀',
      publishedAt:'',
      updatedAt:'2026-07-29T13:40:00+09:00'
    }
  ];
  let memoryRecords=null;

  function clone(value){
    return JSON.parse(JSON.stringify(value));
  }
  function normalize(record){
    const now=new Date().toISOString();
    const audience=AUDIENCES.has(record?.audience)?record.audience:'all';
    const status=STATUSES.has(record?.status)?record.status:'draft';
    return {
      id:String(record?.id||`notice-${Date.now()}`),
      title:String(record?.title||'').trim(),
      summary:String(record?.summary||'').trim(),
      body:String(record?.body||'').trim(),
      audience,
      status,
      important:Boolean(record?.important),
      author:String(record?.author||'플랫폼 운영팀').trim(),
      publishedAt:status==='published'?String(record?.publishedAt||now):String(record?.publishedAt||''),
      updatedAt:String(record?.updatedAt||now)
    };
  }
  function read(){
    try{
      const stored=JSON.parse(window.localStorage.getItem(STORAGE_KEY)||'null');
      if(Array.isArray(stored)){
        memoryRecords=stored.map(normalize);
        return clone(memoryRecords);
      }
    }catch(error){}
    if(!memoryRecords) memoryRecords=seedNotices.map(normalize);
    return clone(memoryRecords);
  }
  function write(records){
    memoryRecords=records.map(normalize);
    try{ window.localStorage.setItem(STORAGE_KEY,JSON.stringify(memoryRecords)); }catch(error){}
    window.dispatchEvent(new CustomEvent('unichat:notices-updated'));
    return clone(memoryRecords);
  }
  function sortPublished(records){
    return records.sort((a,b)=>{
      if(a.important!==b.important) return a.important?-1:1;
      return String(b.publishedAt||b.updatedAt).localeCompare(String(a.publishedAt||a.updatedAt));
    });
  }
  function list(){
    return read();
  }
  function listFor(audience){
    return sortPublished(read().filter(record=>
      record.status==='published'&&(record.audience==='all'||record.audience===audience)
    ));
  }
  function get(id){
    return read().find(record=>record.id===id)||null;
  }
  function save(record){
    const records=read();
    const existingIndex=records.findIndex(item=>item.id===record.id);
    const existing=existingIndex>=0?records[existingIndex]:null;
    const next=normalize({
      ...existing,
      ...record,
      id:existing?.id||record.id||`notice-${Date.now()}`,
      publishedAt:record.status==='published'
        ? existing?.publishedAt||record.publishedAt||new Date().toISOString()
        : existing?.publishedAt||record.publishedAt||'',
      updatedAt:new Date().toISOString()
    });
    if(existingIndex>=0) records[existingIndex]=next;
    else records.unshift(next);
    write(records);
    return clone(next);
  }
  function setStatus(id,status){
    if(!STATUSES.has(status)) return null;
    const record=get(id);
    if(!record) return null;
    return save({...record,status});
  }
  function formatDate(value){
    const date=new Date(value);
    if(Number.isNaN(date.getTime())) return value||'—';
    return new Intl.DateTimeFormat('ko-KR',{year:'numeric',month:'long',day:'numeric'}).format(date);
  }

  window.UniChatNotices={
    storageKey:STORAGE_KEY,
    list,
    listFor,
    get,
    save,
    setStatus,
    formatDate,
    audienceLabels:{all:'학생·학교 전체',student:'학생',university:'학교'},
    statusLabels:{draft:'게시 예정',published:'게시 중',hidden:'종료'}
  };
})();
