/**
 * This function is used to make sure that you switch over all variants in union type
 * for example you have such type to represent state of loadable data from BE:
 *
 *  type LoadableData<T> =
 *     | { type: 'loading'}
 *     | {type: 'loaded', data: T  }
 *     | {type: 'error', error: Error}
 *
 *  you can render this smth like this:
 *
 *  const state: LoadableData<Account> = ...
 *
 *  switch(state.type){
 *    case 'loading':{
 *      return renderLoading()
 *    }
 *    case 'loaded':{
 *      return renderData(state.data)
 *    }
 *    case 'error':{
 *      return renderError()
 *    }
 *    default:
 *      // this statement never should be reached so TS will not show any error.
 *      notReachable(state)
 *  }
 *
 *  but later on if you decide to add one more variant to LoadableData {type: 'not_started'} to represet state where no one even start loading your data
 *  now you should search for all places to update switch case. With notReachable helper TS will give you an error in each place where you need to update code
 *  so extension of types will be statically checked
 *
 * @param _
 */

export const notReachable = (_: never): never => {
  throw new Error(`should never be reached ${_}`)
}
