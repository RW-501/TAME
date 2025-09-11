import React from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native';
let Pdf:any; try { Pdf = require('react-native-pdf').default; } catch(e){ Pdf = null; }
const MANIFEST = require('../../data/books/decodables/short_o_pdf_manifest.json');

export default function DecodablePDFShortO(){
  const [page, setPage] = React.useState(1);
  const [pages, setPages] = React.useState(1);
  const [fileIdx, setFileIdx] = React.useState(0);
  const file = MANIFEST.files[fileIdx];
  const src = { uri: `bundle-assets://books/dc2a-short-o/${file}` };

  return (
    <ScrollView contentContainerStyle={{padding:16}}>
      <Text style={s.h}>Decodable — Dan's Hot Dogs (PDF)</Text>
      <Text>Schedule 2A • Files bundled in app.</Text>
      <View style={s.row}>
        <Pressable style={s.btn} onPress={()=> setFileIdx((i)=> (i+1)%MANIFEST.files.length)}><Text style={s.bt}>Switch file</Text></Pressable>
        <Text>{file}</Text>
      </View>

      {!Pdf ? (
        <View style={s.card}>
          <Text style={{fontWeight:'900'}}>PDF viewer not installed</Text>
          <Text style={{marginTop:4}}>Install dependency to render pages:</Text>
          <Text style={{marginTop:4}}>npm i react-native-pdf react-native-blob-util</Text>
          <Text>iOS: cd ios && pod install</Text>
        </View>
      ) : (
        <View style={s.card}>
          <Pdf source={src} page={page} onLoadComplete={(n:number)=>setPages(n)} onPageChanged={(p:number)=>setPage(p)} style={{height:500}} />
          <View style={[s.row,{marginTop:8}]}>
            <Pressable style={s.btn} onPress={()=> setPage(p=> Math.max(1,p-1))}><Text style={s.bt}>◀ Prev</Text></Pressable>
            <Text>Page {page} / {pages}</Text>
            <Pressable style={s.btn} onPress={()=> setPage(p=> Math.min(pages,p+1))}><Text style={s.bt}>Next ▶</Text></Pressable>
          </View>
        </View>
      )}
    </ScrollView>
  );
}
const s=StyleSheet.create({ h:{fontSize:22,fontWeight:'900'}, row:{flexDirection:'row',gap:8,alignItems:'center',flexWrap:'wrap',marginTop:8}, btn:{borderWidth:1,borderRadius:10,paddingHorizontal:12,paddingVertical:8}, bt:{fontWeight:'900'}, card:{borderWidth:1,borderRadius:12,padding:12,marginTop:10} });
