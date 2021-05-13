module.exports = (function (e) {
  var t = {}
  function n(r) {
    if (t[r]) return t[r].exports
    var a = (t[r] = { i: r, l: !1, exports: {} })
    return e[r].call(a.exports, a, a.exports, n), (a.l = !0), a.exports
  }
  return (
    (n.m = e),
    (n.c = t),
    (n.d = function (e, t, r) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r })
    }),
    (n.r = function (e) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 })
    }),
    (n.t = function (e, t) {
      if ((1 & t && (e = n(e)), 8 & t)) return e
      if (4 & t && 'object' == typeof e && e && e.__esModule) return e
      var r = Object.create(null)
      if (
        (n.r(r),
        Object.defineProperty(r, 'default', { enumerable: !0, value: e }),
        2 & t && 'string' != typeof e)
      )
        for (var a in e)
          n.d(
            r,
            a,
            function (t) {
              return e[t]
            }.bind(null, a)
          )
      return r
    }),
    (n.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default
            }
          : function () {
              return e
            }
      return n.d(t, 'a', t), t
    }),
    (n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t)
    }),
    (n.p = ''),
    n((n.s = 0))
  )
})([
  function (e, t, n) {
    'use strict'
    var r =
      (this && this.__importDefault) ||
      function (e) {
        return e && e.__esModule ? e : { default: e }
      }
    t.__esModule = !0
    var a = r(n(1)),
      u = n(2)
    n(3),
      (t.default = function (e) {
        var t = [
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: function (e) {
              return a.default.createElement('a', null, e)
            },
          },
          { title: 'Age', dataIndex: 'age', key: 'age' },
          { title: 'Address', dataIndex: 'address', key: 'address' },
          {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: function (e) {
              return a.default.createElement(
                'span',
                null,
                e.map(function (e) {
                  var t = e.length > 5 ? 'geekblue' : 'green'
                  return (
                    'loser' === e && (t = 'volcano'),
                    a.default.createElement(
                      u.Tag,
                      { color: t, key: e },
                      e.toUpperCase()
                    )
                  )
                })
              )
            },
          },
          {
            title: 'Action',
            key: 'action',
            render: function (e, t) {
              return a.default.createElement(
                'span',
                null,
                a.default.createElement(
                  'a',
                  { style: { marginRight: 16 } },
                  'Invite ',
                  t.name
                ),
                a.default.createElement('a', null, 'Delete')
              )
            },
          },
        ]
        return a.default.createElement(u.Table, {
          className: 'table-class',
          columns: t,
          dataSource: e.data,
        })
      })
  },
  function (e, t) {
    e.exports = require('react')
  },
  function (e, t) {
    e.exports = require('antd')
  },
  function (e, t, n) {},
])
