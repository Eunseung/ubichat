(function () {
  'use strict';
  const STORAGE_KEY = 'unichat.mock.audit-log.v1';
  const seed = [
    {id:'seed-1',at:'2026-07-21 09:20',actor:'플랫폼 관리자 · 운영팀 김하나',role:'플랫폼 관리자',scope:'대학 승인',action:'대학 등록 승인',target:'서정대학교',detail:'대학 등록 검토를 완료하고 최고관리자 초대를 발급함',result:'성공',previousValue:'등록 검토 대기',changedValue:'승인됨',universityId:'seojeong'},
    {id:'seed-2',at:'2026-07-21 09:05',actor:'플랫폼 관리자 · 운영팀 김하나',role:'플랫폼 관리자',scope:'계정',action:'대학계정 초대 발급',target:'admission@seojeong.ac.kr',detail:'언어교육원 담당자에게 소속구분 관리자 권한을 부여함',result:'성공',previousValue:'미발급',changedValue:'소속구분 관리자',universityId:'seojeong',affiliationId:'language-center'}
  ];
  const clone=(value)=>JSON.parse(JSON.stringify(value));
  const read=()=>{try{const value=JSON.parse(window.localStorage.getItem(STORAGE_KEY));return Array.isArray(value)?value:clone(seed);}catch(_){return clone(seed);}};
  const emit=(entries)=>window.dispatchEvent(new CustomEvent('unichat:audit-log-updated',{detail:clone(entries)}));
  const write=(entries)=>{window.localStorage.setItem(STORAGE_KEY,JSON.stringify(entries));emit(entries);};
  const now=()=>{const date=new Date();const two=(value)=>String(value).padStart(2,'0');return `${date.getFullYear()}-${two(date.getMonth()+1)}-${two(date.getDate())} ${two(date.getHours())}:${two(date.getMinutes())}`;};
  window.UniChatAuditLog={
    list:()=>clone(read()),
    add:(entry)=>{const rows=read();const item={id:`audit-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,at:now(),actor:String(entry.actor||'시스템'),role:String(entry.role||'시스템'),scope:String(entry.scope||'운영'),action:String(entry.action||'변경'),target:String(entry.target||'—'),detail:String(entry.detail||''),result:String(entry.result||'성공'),previousValue:String(entry.previousValue||''),changedValue:String(entry.changedValue||''),universityId:String(entry.universityId||''),affiliationId:String(entry.affiliationId||''),contentId:String(entry.contentId||'')};rows.unshift(item);write(rows.slice(0,200));return clone(item);},
    reset:()=>write(clone(seed))
  };
  window.addEventListener('storage',(event)=>{if(event.key===STORAGE_KEY) emit(read());});
}());
