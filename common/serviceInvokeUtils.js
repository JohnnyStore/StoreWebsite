var http = require('http');
var qs = require('querystring');
var util = require('util');

exports.get = function(host, port, path, callback){
  var options = {
    hostname: host,
    port: port,
    path: encodeURI(path),
    method: 'GET'
  };

  var content = '';
  var req = http.request(options, function (res) {
    if(res.statusCode === 200){
      res.setEncoding('utf8');
      res.on('data', function (data) {
        content += data.toString();
      }).on('end', function(){
        content = JSON.parse(content);
        return callback({
          'err': false,
          'content': content
        });
      });
    }else{
      return callback({
        'err': true,
        'code': 'NE02',
        'msg': '请求API失败，无法执行GET操作。',
        'detail': util.format('invoke service failed. statusCode:[%s], host:[%s], port:[%s], path:[%s], param:[%s]', res.statusCode, host, port, path)
      });
    }
  });

  req.on('error', function (e) {
    return callback({
      'err': true,
      'code': 'NE03',
      'msg': '无法访问API，请检查API是否正常',
      'detail': util.format('get service error. host:[%s], port:[%s], path:[%s], param:[%s], reason:[%s]', host, port, path, e.message)
    });
  });

  req.end();
};

exports.post = function(data, host, port, path, callback){
  data = JSON.stringify(data);
  var options = {
    method: 'POST',
    host: host,
    port: port,
    path: path,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Content-Length': Buffer.byteLength(data, 'utf8')
    }
  };

  var content = '';
  var req = http.request(options, function (res) {
    if(res.statusCode === 200){
      res.setEncoding('utf8');
      res.on('data', function (data) {
        content += data.toString();
      }).on('end', function(){
        content = JSON.parse(content);
        return callback({
          'err': false,
          'content': content
        });
      });
    }else{
      return callback({
        'err': true,
        'code': 'NE02',
        'msg': '请求API失败，无法执行POST操作。',
        'detail': util.format('invoke service failed. statusCode:[%s], host:[%s], port:[%s], path:[%s], data:[%s]', res.statusCode, host, port, path, JSON.stringify(data))
      });
    }
  });

  req.on('error', function (e) {
    return callback({
      'err': true,
      'code': 'NE03',
      'msg': '无法访问API，请检查API是否正常',
      'detail': util.format('post service error. host:[%s], port:[%s], path:[%s], data:[%s], reason:[%s]', host, port, path, JSON.stringify(data), e.message)
    });
  });

  req.write(data);
  req.end();
};

exports.put = function(data, host, port, path, callback){
  data = JSON.stringify(data);
  var options = {
    method: 'PUT',
    host: host,
    port: port,
    path: path,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Content-Length': Buffer.byteLength(data, 'utf8')
    }
  };

  var content = '';
  var req = http.request(options, function (res) {
    if(res.statusCode === 200){
      res.setEncoding('utf8');
      res.on('data', function (data) {
        content += data.toString();
      }).on('end', function(){
        content = JSON.parse(content);
        return callback({
          'err': false,
          'content': content
        });
      });
    }else{
      return callback({
        'err': true,
        'code': 'NE02',
        'msg': '请求API失败，无法执行PUT操作。',
        'detail': util.format('put service failed. statusCode:[%s], host:[%s], port:[%s], path:[%s], data:[%s]', res.statusCode, host, port, path, JSON.stringify(data))
      });
    }
  });

  req.on('error', function (e) {
    return callback({
      'err': true,
      'code': 'NE03',
      'msg': '无法访问API，请检查API是否正常',
      'detail': util.format('invoke service error. host:[%s], port:[%s], path:[%s], data:[%s], reason:[%s]', host, port, path, JSON.stringify(data), e.message)
    });
  });

  req.write(data);
  req.end();
};

exports.delete = function(host, port, path, callback){
  var options = {
    hostname: host,
    port: port,
    path: path,
    method: 'DELETE'
  };

  var content = '';
  var req = http.request(options, function (res) {
    if(res.statusCode === 200){
      res.setEncoding('utf8');
      res.on('data', function (data) {
        content += data.toString();
      }).on('end', function(){
        content = JSON.parse(content);
        return callback({
          'err': false,
          'content': content
        });
      });
    }else{
      return callback({
        'err': true,
        'code': 'NE02',
        'msg': '请求API失败，无法执行DELETE操作。',
        'detail': util.format('delete service failed. statusCode:[%s], host:[%s], port:[%s], path:[%s], param:[%s]', res.statusCode, host, port, path, param)
      });
    }
  });

  req.on('error', function (e) {
    return callback({
      'err': true,
      'code': 'NE03',
      'msg': '无法访问API，请检查API是否正常',
      'detail': util.format('invoke service error. host:[%s], port:[%s], path:[%s], param:[%s], reason:[%s]', host, port, path, param, e.message)
    });
  });

  req.end();
};