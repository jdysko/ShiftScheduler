import PySQLPool


class dbconnector:
    def __init__(self, dbpool):
        self.dbpool = dbpool
        self.dbp = self.dbpool

    def getq(self):
        r = PySQLPool.getNewQuery(self.dbp, commitOnEnd=True)
        return r

    def createParams(self, key, val):
        return [{key: val}]

    def getParams(self, sql, args):
        s = 'call getParams("' + str(sql) + '")'
        try:

            q = self.getq()
            q.Query(s)
            params = q.record
            sqlparams = ' ('
            for x in params:
                pn = x['ParameterName']
                if args.__len__() > 1:
                    for z in args:
                        if pn in z:
                            d = z.get(pn)
                            if type(z.get(pn)) == str:
                                sqlparams += '"' + str(d) + '", '
                            elif type(z.get(pn)) == long:
                                sqlparams += str(d) + ', '
                            elif type(z.get(pn)) == int:
                                sqlparams += str(d) + ', '
                else:
                    if type(args.get(pn)) == str:
                        sqlparams += '"' + str(args.get(pn)) + '", '
                    elif type(args.get(pn)) == long:
                        sqlparams += str(args.get(pn)) + ', '
                    elif type(args.get(pn)) == int:
                        sqlparams += str(args.get(pn)) + ', '
        except UnboundLocalError:
            print s + ': wysral z getParams'
        finally:
            sqlparams = sqlparams[:-2] + ')'
        return sqlparams

    def SelectProcedure(self, sql, args=None):
        if args is None:
            p = ""
        else:
            p = self.getParams(sql, args)
        try:
            sqlCommand = 'Call ' + str(sql) + p
            q = self.getq()

            q.query(sqlCommand)
            result = []
            for r in q.record:
                result.append(r)

        except UnboundLocalError:
            print sqlCommand + ': wysral z SelectProcedure'
        finally:
            return result

    def ScalarProcedure(self, sql, args):
        p = self.getParams(sql, args)

        try:
            q = self.getq()
            sqlCommand = 'Call ' + str(sql) + p
            q.Query(sqlCommand)
            r = ""
            if q.record:
                r = q.record

        except UnboundLocalError:
            print sqlCommand + ': wysral z ScalarProcedure'
        finally:
            return r

    def SelectProcedureFromSource(self, sourceid, args):
        p = {"SourceID": sourceid}
        sqlsource = self.SelectProcedure("getSQLSource", p)
        return self.SelectProcedure(sqlsource[0].get("SQLProcedure"), args)
