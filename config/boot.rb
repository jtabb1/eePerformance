ENV['BUNDLE_GEMFILE'] ||= File.expand_path('../Gemfile', __dir__)

require "bundler/setup" # Set up gems listed in the Gemfile.
# the below line and module is from stackoverflow on changing the default port
# https://stackoverflow.com/questions/3842818/how-to-change-rails-3-server-default-port-in-develoment
# (This doesn't work because ruby can't resolve 'rails/commands/server' so it is all being 
#  commented out.)
# require 'rails/commands/server'
#
# module Rails
#   class Server
#     alias :default_options_alias :default_options
#     def default_options
#       default_options_alias.merge!(:Port => 9393)
#     end    
#   end
# end