(function () {
  'use strict';
  const STORAGE_KEY = 'unichat.mock.audit-log.v1';
  const seed = [
    {id:'seed-1',at:'2026-07-21 09:20',actor:'플랫폼 관리자 · 운영팀 김하나',role:'플랫폼 관리자',scope:'대학 공개',action:'공개 탐색 노출 유지',target:'서정대학교',detail:'게시 중인 공개 대학 정보 확인'},
    {id:'seed-2',at:'2026-07-21 09:05',actor:'김서윤',role:'대학 멤버',scope:'대학 정보',action:'프로필 변경 검토 요청',target:'서정대학교',detail:'모집 브로셔와 한 줄 소개 변경 요청'}
  ];
  const clone=(value)=>JSON.parse(JSON.stringify(value));
  const read=()=>{try{const value=JSON.parse(window.localStorage.getItem(STORAGE_KEY));return Array.isArray(value)?value:clone(seed);}catch(_){return clone(seed);}};
  const emit=(entries)=>window.dispatchEvent(new CustomEvent('unichat:audit-log-updated',{detail:clone(entries)}));
  const write=(entries)=>{window.localStorage.setItem(STORAGE_KEY,JSON.stringify(entries));emit(entries);};
  const now=()=>{const date=new Date();const two=(value)=>String(value).padStart(2,'0');return `${date.getFullYear()}-${two(date.getMonth()+1)}-${two(date.getDate())} ${two(date.getHours())}:${two(date.getMinutes())}`;};
  window.UniChatAuditLog={
    list:()=>clone(read()),
    add:(entry)=>{const rows=read();const item={id:`audit-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,at:now(),actor:String(entry.actor||'시스템'),role:String(entry.role||'시스템'),scope:String(entry.scope||'운영'),action:String(entry.action||'변경'),target:String(entry.target||'—'),detail:String(entry.detail||'')};rows.unshift(item);write(rows.slice(0,200));return clone(item);},
    reset:()=>write(clone(seed))
  };
  window.addEventListener('storage',(event)=>{if(event.key===STORAGE_KEY) emit(read());});
}());
